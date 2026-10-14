"""Publish new and changed local visual-design folders to GitHub."""

from __future__ import annotations

import argparse
from pathlib import Path
from run_logging import start_run_log

from design_sync_core import (
    SyncError,
    active_project_names,
    ensure_project_metadata,
    changed_tree_entries,
    fail,
    generate_index,
    join_repo_path,
    load_config,
    make_client,
    project_directories,
    project_hash,
    project_remote_files,
    read_manifest,
    utc_now,
    write_manifest,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=Path(__file__).with_name("github_config.json"))
    parser.add_argument("--dry-run", action="store_true", help="Scan and report without contacting GitHub.")
    return parser.parse_args()


def run(config_path: Path, dry_run: bool = False) -> int:
    config = load_config(config_path)
    projects = project_directories(config["_designs_path"])
    created_metadata = ensure_project_metadata(projects)
    if created_metadata:
        print(f"Created project.json for {len(created_metadata)} project(s):")
        for metadata_path in created_metadata:
            print(f"  {metadata_path}")
        print("Fill in each developer_name in project.json, then run sync again to publish the details.")
    manifest = read_manifest(config["_manifest_path"])
    hashes = {name: project_hash(path) for name, path in projects.items()}

    to_upload = []
    unchanged = []
    intentionally_removed = []
    for name in projects:
        row = manifest.get(name)
        if row and row.get("status") == "removed" and row.get("content_hash") == hashes[name]:
            intentionally_removed.append(name)
        elif row and row.get("status", "active") == "active" and row.get("content_hash") == hashes[name]:
            unchanged.append(name)
        else:
            to_upload.append(name)

    missing_local = sorted(
        (name for name, row in manifest.items() if row.get("status", "active") == "active" and name not in projects),
        key=str.casefold,
    )
    active_names = active_project_names(projects, manifest, hashes)

    print(f"Found {len(projects)} local project folder(s).")
    if to_upload:
        print("New or changed: " + ", ".join(to_upload))
    if unchanged:
        print("Unchanged: " + ", ".join(unchanged))
    if intentionally_removed:
        print("Intentionally removed (skipped): " + ", ".join(intentionally_removed))
    if missing_local:
        print("Still live but missing locally: " + ", ".join(missing_local))

    if dry_run:
        print("Dry run complete; GitHub and the manifest were not changed.")
        return 0

    client = make_client(config)
    branch, head_sha, base_tree_sha = client.prepare()
    existing = client.tree(base_tree_sha)
    desired: dict[str, bytes] = {
        "index.html": generate_index(active_names, config, projects, existing),
        ".nojekyll": b"",
    }
    remote_root = config["repository"]["designs_path"]
    changed_prefixes = []
    for name in to_upload:
        prefix = join_repo_path(remote_root, name) + "/"
        changed_prefixes.append(prefix)
        desired.update(project_remote_files(name, projects[name], remote_root))

    entries = changed_tree_entries(desired, existing, client)
    desired_paths = set(desired)
    for prefix in changed_prefixes:
        for remote_path, item in existing.items():
            if remote_path.startswith(prefix) and item.get("type") == "blob" and remote_path not in desired_paths:
                entries.append({"path": remote_path, "mode": "100644", "type": "blob", "sha": None})

    commit_sha = head_sha
    if entries:
        message = config["repository"]["commit_message"]
        commit_sha = client.commit_changes(branch, head_sha, base_tree_sha, entries, message)
        print(f"Published {len(to_upload)} project(s) in commit {commit_sha[:12]}.")
    else:
        print("GitHub is already up to date.")

    now = utc_now()
    for name in to_upload:
        manifest[name] = {
            "project": name,
            "source_path": str(projects[name]),
            "content_hash": hashes[name],
            "status": "active",
            "remote_path": join_repo_path(remote_root, name),
            "last_synced_utc": now,
            "last_commit": commit_sha,
        }
    write_manifest(config["_manifest_path"], manifest)
    print(f"Tracking file: {config['_manifest_path']}")
    owner = config["github"]["owner"]
    repository = config["github"]["repository"]
    if repository.casefold() == f"{owner}.github.io".casefold():
        pages_url = f"https://{owner}.github.io/"
    else:
        pages_url = f"https://{owner}.github.io/{repository}/"
    print(f"Expected GitHub Pages URL: {pages_url}")
    return 0


def main() -> int:
    log_path = start_run_log("sync", Path(__file__).resolve().parent)
    print(f"Log file: {log_path}")
    args = parse_args()
    try:
        return run(args.config, args.dry_run)
    except (SyncError, OSError) as exc:
        fail(str(exc))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
