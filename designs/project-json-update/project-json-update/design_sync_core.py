"""Shared implementation for the visual-design GitHub synchronizer."""

from __future__ import annotations

import base64
import csv
import hashlib
import html
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from typing import Iterable


MANIFEST_FIELDS = (
    "project",
    "source_path",
    "content_hash",
    "status",
    "remote_path",
    "last_synced_utc",
    "last_commit",
)


class SyncError(RuntimeError):
    """An error that can be shown directly to the user."""


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def normalize_repo_path(value: str) -> str:
    value = value.replace("\\", "/").strip("/")
    if not value or value == ".":
        return ""
    path = PurePosixPath(value)
    if ".." in path.parts:
        raise SyncError(f"Unsafe repository path: {value!r}")
    return str(path)


def join_repo_path(*parts: str) -> str:
    return "/".join(p.strip("/") for p in parts if p and p.strip("/"))


def load_config(config_path: Path) -> dict:
    if not config_path.exists():
        raise SyncError(
            f"Configuration file not found: {config_path}\n"
            "Copy github_config.example.json to github_config.json and edit it."
        )
    try:
        config = json.loads(config_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise SyncError(f"Could not read {config_path}: {exc}") from exc

    github = config.get("github", {})
    local = config.get("local", {})
    repository = config.get("repository", {})
    required = {
        "github.owner": github.get("owner"),
        "github.repository": github.get("repository"),
        "github.token": github.get("token"),
        "local.designs_directory": local.get("designs_directory"),
    }
    missing = [name for name, value in required.items() if not value]
    if missing:
        raise SyncError("Missing configuration value(s): " + ", ".join(missing))
    if str(github["token"]).startswith("PASTE_"):
        raise SyncError("Replace the placeholder token in github_config.json.")

    base = config_path.resolve().parent
    designs = Path(local["designs_directory"])
    manifest = Path(local.get("manifest_file", ".design_sync_manifest.csv"))
    config["_config_path"] = config_path.resolve()
    config["_designs_path"] = designs if designs.is_absolute() else (base / designs).resolve()
    config["_manifest_path"] = manifest if manifest.is_absolute() else (base / manifest).resolve()
    repository["designs_path"] = normalize_repo_path(repository.get("designs_path", "designs"))
    repository.setdefault("index_title", "Visual Design Gallery")
    repository.setdefault("index_description", "A collection of visual design projects.")
    repository.setdefault("commit_message", "Update visual design gallery")
    config["repository"] = repository
    return config


def project_directories(designs_root: Path) -> dict[str, Path]:
    if not designs_root.exists():
        raise SyncError(f"Designs directory does not exist: {designs_root}")
    if not designs_root.is_dir():
        raise SyncError(f"Designs path is not a directory: {designs_root}")
    projects: dict[str, Path] = {}
    for path in sorted(designs_root.iterdir(), key=lambda p: p.name.casefold()):
        if path.is_dir() and not path.name.startswith("."):
            projects[path.name] = path
    return projects


def iter_project_files(project_dir: Path) -> Iterable[Path]:
    for root, dirs, files in os.walk(project_dir):
        dirs[:] = sorted(d for d in dirs if not d.startswith(".") and d != "__pycache__")
        for filename in sorted(files):
            if filename.startswith(".") or filename.endswith((".pyc", ".pyo")):
                continue
            path = Path(root) / filename
            if path.is_symlink():
                continue
            yield path


def ensure_project_metadata(projects: dict[str, Path]) -> list[Path]:
    """Create a minimal project.json for projects that do not have one yet.

    Existing metadata is never overwritten. The developer name is intentionally
    blank because it may differ for every project and can change over time.
    """
    created: list[Path] = []
    for name, project_dir in projects.items():
        metadata_file = project_dir / "project.json"
        if metadata_file.exists():
            continue
        module_name = name.replace("-", " ").replace("_", " ").title()
        payload = {
            "module_name": module_name,
            "developer_name": ""
        }
        metadata_file.write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        created.append(metadata_file)
    return created


def project_hash(project_dir: Path) -> str:
    digest = hashlib.sha256()
    for path in iter_project_files(project_dir):
        relative = path.relative_to(project_dir).as_posix().encode("utf-8")
        digest.update(len(relative).to_bytes(8, "big"))
        digest.update(relative)
        data = path.read_bytes()
        digest.update(len(data).to_bytes(8, "big"))
        digest.update(data)
    return digest.hexdigest()


def git_blob_sha(data: bytes) -> str:
    header = f"blob {len(data)}\0".encode("ascii")
    return hashlib.sha1(header + data).hexdigest()


def read_manifest(path: Path) -> dict[str, dict[str, str]]:
    if not path.exists():
        return {}
    try:
        with path.open("r", encoding="utf-8-sig", newline="") as handle:
            rows = list(csv.DictReader(handle))
    except OSError as exc:
        raise SyncError(f"Could not read manifest {path}: {exc}") from exc
    return {row.get("project", ""): row for row in rows if row.get("project")}


def write_manifest(path: Path, rows: dict[str, dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + ".tmp")
    with temp.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=MANIFEST_FIELDS, extrasaction="ignore")
        writer.writeheader()
        for name in sorted(rows, key=str.casefold):
            writer.writerow({field: rows[name].get(field, "") for field in MANIFEST_FIELDS})
    temp.replace(path)


def active_project_names(
    projects: dict[str, Path], manifest: dict[str, dict[str, str]], hashes: dict[str, str]
) -> list[str]:
    names = set()
    for name, row in manifest.items():
        if row.get("status", "active") == "active":
            names.add(name)
    for name in projects:
        row = manifest.get(name)
        if not row or row.get("status") != "removed" or row.get("content_hash") != hashes[name]:
            names.add(name)
    return sorted(names, key=str.casefold)


def generate_index(
    names: Iterable[str],
    config: dict,
    projects: dict[str, Path] | None = None,
    existing: dict[str, dict] | None = None,
) -> bytes:
    repo = config["repository"]
    title_text = repo["index_title"]
    title = html.escape(title_text)
    description = html.escape(repo["index_description"])
    base = repo["designs_path"]
    projects = projects or {}
    existing = existing or {}
    source_extensions = {".tsx", ".jsx", ".vue", ".svelte", ".astro", ".py", ".php"}
    rows = []

    for name in names:
        display_text = name.replace("-", " ").replace("_", " ").title()
        display = html.escape(display_text)
        prefix = join_repo_path(base, name)
        project_path = projects.get(name)

        # Optional metadata stored in designs/<project>/project.json.
        metadata = {}
        if project_path and project_path.exists():
            metadata_file = project_path / "project.json"
            if metadata_file.exists():
                try:
                    loaded = json.loads(metadata_file.read_text(encoding="utf-8"))
                    if isinstance(loaded, dict):
                        metadata = loaded
                except (OSError, json.JSONDecodeError):
                    metadata = {}

        module_text = str(metadata.get("module_name") or display_text)
        developer_text = str(metadata.get("developer_name") or "Not specified")
        module_name = html.escape(module_text)
        developer_name = html.escape(developer_text)

        # Gather local and remote paths so already-published files remain visible.
        remote_files = set()
        if project_path and project_path.exists():
            for file_path in iter_project_files(project_path):
                remote_files.add(
                    join_repo_path(prefix, file_path.relative_to(project_path).as_posix())
                )
        remote_files.update(
            path for path, item in existing.items()
            if path.startswith(prefix + "/") and item.get("type") == "blob"
        )
        files = sorted(remote_files, key=str.casefold)
        html_files = [
            path for path in files
            if PurePosixPath(path).suffix.casefold() in {".html", ".htm"}
        ]
        source_files = [
            path for path in files
            if PurePosixPath(path).suffix.casefold() in source_extensions
        ]
        root_index = next(
            (path for path in html_files
             if path.casefold() == (prefix + "/index.html").casefold()),
            None,
        )
        selected = root_index or next(iter(html_files or source_files), None)

        def public_path(path: str) -> str:
            return "/".join(
                urllib.parse.quote(part, safe="") for part in path.split("/")
            )

        if selected:
            encoded = public_path(selected)
            is_preview = PurePosixPath(selected).suffix.casefold() in {".html", ".htm"}
            if is_preview:
                href = encoded
                kind = "HTML preview"
            else:
                github = config["github"]
                branch = urllib.parse.quote(github.get("branch") or "main", safe="")
                href = (
                    f"https://github.com/{github['owner']}/"
                    f"{github['repository']}/blob/{branch}/{encoded}"
                )
                kind = "Source files"
            link = f'<a class="open-project" href="{html.escape(href, quote=True)}">Open project <span aria-hidden="true">↗</span></a>'
        else:
            kind = "No preview file found"
            link = '<span class="no-preview">No preview available</span>'

        # A project-level index is the landing page, not one of the design previews.
        preview_files = [path for path in html_files if path != root_index]
        if not preview_files and not root_index:
            preview_files = html_files
        preview_links = []
        for file_path in preview_files:
            label_text = PurePosixPath(file_path).stem.replace("-", " ").replace("_", " ").title()
            preview_label = html.escape(label_text)
            preview_href = html.escape(public_path(file_path), quote=True)
            preview_links.append(
                f'<a class="preview-link" href="{preview_href}">{preview_label}</a>'
            )
        previews_html = (
            '<div class="preview-list"><div class="preview-heading">Available previews</div>'
            + ''.join(preview_links)
            + '</div>'
            if preview_links else '<div class="preview-note">Open the project to view its design.</div>'
        )

        searchable = html.escape(f"{display_text} {module_text} {developer_text}".casefold(), quote=True)
        rows.append(
            f'<article class="project-card" data-search="{searchable}" '
            f'data-module="{html.escape(module_text.casefold(), quote=True)}" '
            f'data-developer="{html.escape(developer_text.casefold(), quote=True)}">'
            f'<div class="card-top"><span class="project-icon" aria-hidden="true">▧</span>'
            f'<span class="file-count">{len(preview_files) or (1 if root_index else 0)} preview(s)</span></div>'
            f'<h2>{display}</h2>'
            f'<div class="metadata"><div><span class="meta-label">MODULE</span><span>{module_name}</span></div>'
            f'<div><span class="meta-label">DEVELOPER</span><span>{developer_name}</span></div></div>'
            f'<div class="card-kind">{html.escape(kind)}</div>'
            f'{previews_html}{link}</article>'
        )

    rows_html = "\n".join(rows) if rows else (
        '<div class="empty">No designs have been published yet.</div>'
    )
    document = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    :root {{ font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #202333; background: #f6f7fb; }}
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; }}
    .hero {{ background: #fff; border-bottom: 1px solid #e8eaf1; }}
    main {{ width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding: 18px 0 28px; }}
    .hero h1 {{ margin: 0 0 4px; font-size: clamp(1.45rem, 2.5vw, 1.9rem); letter-spacing: -.04em; }}
    .intro {{ margin: 0; color: #707589; line-height: 1.4; font-size: .9rem; }}
    .toolbar {{ display: flex; gap: 10px; margin: 14px 0 10px; }}
    .search {{ width: 100%; min-width: 0; padding: 9px 12px; border: 1px solid #dfe2eb; border-radius: 12px; background: #fff; color: inherit; font: inherit; outline: none; }}
    .search:focus {{ border-color: #7770ef; box-shadow: 0 0 0 3px #7770ef20; }}
    .count {{ margin: 0 0 10px; color: #777b8d; font-size: .8rem; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 235px), 1fr)); gap: 12px; align-items: start; }}
    .project-card {{ min-width: 0; padding: 14px; display: flex; flex-direction: column; background: #fff; border: 1px solid #e7e9f1; border-radius: 12px; box-shadow: 0 3px 12px #20233307; transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease; }}
    .project-card:hover {{ transform: translateY(-3px); border-color: #d5d3ff; box-shadow: 0 12px 28px #20233312; }}
    .card-top {{ display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }}
    .project-icon {{ display: grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; background: #eeedff; color: #5b52d6; font-size: 1rem; }}
    .file-count {{ color: #656a7e; background: #f3f4f8; padding: 4px 7px; border-radius: 999px; font-size: .68rem; white-space: nowrap; }}
    .project-card h2 {{ margin: 0 0 10px; font-size: 1rem; line-height: 1.3; overflow-wrap: anywhere; }}
    .metadata {{ display: grid; gap: 6px; margin-bottom: 9px; }}
    .metadata > div {{ display: grid; grid-template-columns: 85px minmax(0, 1fr); gap: 7px; font-size: .7rem; overflow-wrap: anywhere; }}
    .meta-label {{ color: #888ca0; font-size: .62rem; letter-spacing: .06em; font-weight: 700; }}
    .card-kind {{ color: #85899b; font-size: .7rem; margin: 0 0 7px; }}
    .preview-list {{ display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }}
    .preview-heading {{ width: 100%; margin-bottom: 0; color: #74788b; font-size: .68rem; font-weight: 650; }}
    .preview-link {{ max-width: 100%; padding: 5px 7px; border: 1px solid #e6e7f0; border-radius: 7px; color: #5149c8; text-decoration: none; font-size: .7rem; overflow-wrap: anywhere; }}
    .preview-link:hover {{ background: #f4f3ff; border-color: #d7d4ff; }}
    .preview-note {{ margin-bottom: 10px; color: #85899b; font-size: .72rem; }}
    .open-project {{ display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: auto; padding: 8px 10px; border-radius: 8px; background: #5b52d6; color: white; font-size: .8rem; font-weight: 650; text-decoration: none; }}
    .open-project:hover {{ background: #4940bd; }}
    .no-preview {{ margin-top: auto; color: #85899b; font-size: .85rem; }}
    .empty {{ padding: 28px; background: white; border: 1px dashed #d7dae5; border-radius: 16px; color: #777b8d; }}
    .empty[hidden], .project-card[hidden] {{ display: none; }}
    footer {{ margin-top: 30px; color: #9397a6; font-size: .78rem; text-align: center; }}
    @media (max-width: 560px) {{ main {{ width: calc(100% - 28px); padding: 16px 0 28px; }} .toolbar {{ margin-top: 12px; }} .project-card {{ padding: 13px; }} }}
  </style>
</head>
<body>
  <header class="hero"><main>
    <h1>{title}</h1>
    <p class="intro">{description}</p>
  </main></header>
  <main>
    <div class="toolbar"><input id="search" class="search" type="search" placeholder="Search projects, modules, developers…" aria-label="Search projects"></div>
    <p class="count" id="count">Showing {len(rows)} project(s)</p>
    <section class="grid" id="gallery" aria-label="Design projects">
{rows_html}
    </section>
    <div class="empty" id="no-results" hidden>No projects match your search.</div>
    <footer>Updated by Design Sync</footer>
  </main>
  <script>
    const search = document.getElementById('search');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const count = document.getElementById('count');
    const noResults = document.getElementById('no-results');
    function filterCards() {{
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {{
        const match = (card.dataset.search || '').includes(query);
        card.hidden = !match;
        if (match) visible++;
      }});
      count.textContent = `Showing ${{visible}} of ${{cards.length}} project(s)`;
      noResults.hidden = visible !== 0;
    }}
    search.addEventListener('input', filterCards);
  </script>
</body>
</html>
"""
    return document.encode("utf-8")


@dataclass
class GitHubClient:
    owner: str
    repository: str
    token: str
    branch: str | None = None

    def _request(self, method: str, endpoint: str, payload: dict | None = None):
        url = f"https://api.github.com{endpoint}"
        data = json.dumps(payload).encode("utf-8") if payload is not None else None
        request = urllib.request.Request(
            url,
            data=data,
            method=method,
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {self.token}",
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "visual-design-sync/1.0",
                "Content-Type": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                raw = response.read()
                return json.loads(raw) if raw else None
        except urllib.error.HTTPError as exc:
            try:
                detail = json.loads(exc.read()).get("message", str(exc))
            except Exception:
                detail = str(exc)
            raise SyncError(f"GitHub API error ({exc.code}): {detail}") from exc
        except urllib.error.URLError as exc:
            raise SyncError(f"Could not connect to GitHub: {exc.reason}") from exc

    @property
    def repo_endpoint(self) -> str:
        owner = urllib.parse.quote(self.owner, safe="")
        repo = urllib.parse.quote(self.repository, safe="")
        return f"/repos/{owner}/{repo}"

    def prepare(self) -> tuple[str, str, str]:
        repo = self._request("GET", self.repo_endpoint)
        default_branch = repo["default_branch"]
        branch = self.branch or default_branch
        branch_q = urllib.parse.quote(branch, safe="")
        try:
            ref = self._request("GET", f"{self.repo_endpoint}/git/ref/heads/{branch_q}")
        except SyncError as exc:
            if "(409)" in str(exc) or "(404)" in str(exc):
                raise SyncError(
                    "The target repository or branch has no initial commit. "
                    "Create the repository with a README, then run the script again."
                ) from exc
            raise
        head_sha = ref["object"]["sha"]
        commit = self._request("GET", f"{self.repo_endpoint}/git/commits/{head_sha}")
        return branch, head_sha, commit["tree"]["sha"]

    def tree(self, tree_sha: str) -> dict[str, dict]:
        result = self._request("GET", f"{self.repo_endpoint}/git/trees/{tree_sha}?recursive=1")
        if result.get("truncated"):
            raise SyncError("The GitHub repository tree is too large for the recursive API response.")
        return {item["path"]: item for item in result.get("tree", [])}

    def create_blob(self, data: bytes) -> str:
        result = self._request(
            "POST",
            f"{self.repo_endpoint}/git/blobs",
            {"content": base64.b64encode(data).decode("ascii"), "encoding": "base64"},
        )
        return result["sha"]

    def commit_changes(
        self,
        branch: str,
        head_sha: str,
        base_tree_sha: str,
        entries: list[dict],
        message: str,
    ) -> str:
        new_tree = self._request(
            "POST",
            f"{self.repo_endpoint}/git/trees",
            {"base_tree": base_tree_sha, "tree": entries},
        )["sha"]
        commit = self._request(
            "POST",
            f"{self.repo_endpoint}/git/commits",
            {"message": message, "tree": new_tree, "parents": [head_sha]},
        )
        branch_q = urllib.parse.quote(branch, safe="")
        self._request(
            "PATCH",
            f"{self.repo_endpoint}/git/refs/heads/{branch_q}",
            {"sha": commit["sha"], "force": False},
        )
        return commit["sha"]


def make_client(config: dict) -> GitHubClient:
    github = config["github"]
    return GitHubClient(
        owner=github["owner"],
        repository=github["repository"],
        token=github["token"],
        branch=github.get("branch") or None,
    )


def project_remote_files(project_name: str, path: Path, remote_root: str) -> dict[str, bytes]:
    prefix = join_repo_path(remote_root, project_name)
    result = {}
    for file_path in iter_project_files(path):
        relative = file_path.relative_to(path).as_posix()
        result[join_repo_path(prefix, relative)] = file_path.read_bytes()
    return result


def changed_tree_entries(
    desired: dict[str, bytes], existing: dict[str, dict], client: GitHubClient
) -> list[dict]:
    entries = []
    for path, data in sorted(desired.items()):
        current = existing.get(path)
        if current and current.get("type") == "blob" and current.get("sha") == git_blob_sha(data):
            continue
        entries.append({"path": path, "mode": "100644", "type": "blob", "sha": client.create_blob(data)})
    return entries


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
