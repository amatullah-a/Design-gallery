/* Campus Placement Platform — Wireframe Kit interactions */

/* ---------------- Sample data ---------------- */
const STUDENTS = [
  { id: 1, name: "Aarav Sharma",  reg: "CS21-1042", dept: "Computer Science",  year: "Final Year", cgpa: 8.9, status: "placed",    offers: 2, active: "2h ago", verified: true, backlogs: 0, dreamSlot: true },
  { id: 2, name: "Priya Nair",    reg: "EC21-0871", dept: "Electronics",       year: "Final Year", cgpa: 9.2, status: "placed",    offers: 3, active: "5h ago", verified: true, backlogs: 0, dreamSlot: false },
  { id: 3, name: "Rohan Mehta",   reg: "ME21-0654", dept: "Mechanical",        year: "Final Year", cgpa: 7.8, status: "process",   offers: 0, active: "1d ago", verified: false, backlogs: 1, dreamSlot: false },
  { id: 4, name: "Sneha Kulkarni",reg: "CS21-1108", dept: "Computer Science",  year: "Final Year", cgpa: 8.4, status: "process",   offers: 1, active: "3h ago", verified: true, backlogs: 0, dreamSlot: false },
  { id: 5, name: "Vikram Reddy",  reg: "CV21-0433", dept: "Civil",             year: "Final Year", cgpa: 7.1, status: "open",      offers: 0, active: "2d ago", verified: false, backlogs: 3, dreamSlot: true },
  { id: 6, name: "Ananya Iyer",   reg: "IT21-0920", dept: "Information Tech",  year: "Final Year", cgpa: 9.0, status: "placed",    offers: 2, active: "1h ago", verified: true, backlogs: 0, dreamSlot: false },
  { id: 7, name: "Karan Malhotra",reg: "EE21-0512", dept: "Electrical",        year: "Final Year", cgpa: 6.9, status: "open",      offers: 0, active: "4d ago", verified: false, backlogs: 2, dreamSlot: false },
  { id: 8, name: "Divya Menon",   reg: "CS21-1177", dept: "Computer Science",  year: "Final Year", cgpa: 8.7, status: "process",   offers: 1, active: "6h ago", verified: true, backlogs: 0, dreamSlot: false },
  { id: 9, name: "Arjun Desai",   reg: "ME21-0701", dept: "Mechanical",        year: "Final Year", cgpa: 8.1, status: "open",      offers: 0, active: "1d ago", verified: false, backlogs: 1, dreamSlot: false },
  { id: 10, name: "Meera Joshi",  reg: "IT21-0955", dept: "Information Tech",  year: "Final Year", cgpa: 9.4, status: "placed",    offers: 4, active: "30m ago", verified: true, backlogs: 0, dreamSlot: true },
];

const STATUS_BADGE = {
  placed:  '<span class="badge ok">Placed</span>',
  process: '<span class="badge info">In process</span>',
  open:    '<span class="badge neutral">Not placed</span>',
};

/* ---------------- Icon helper ---------------- */
function icon(name) {
  return `<span class="ic"><svg><use href="#i-${name}"></use></svg></span>`;
}

/* ---------------- Router ---------------- */
const ROUTES = {
  "/dashboard":  { screen: "screen-dashboard", nav: "dashboard" },
  "/students":   { screen: "screen-students",  nav: "students" },
  "/students/detail": { screen: "screen-student-detail", nav: "students" },
  "/employers":  { screen: "screen-placeholder", nav: "employers", ph: {
      title: "Employers", sub: "Company database & relationship management",
      pattern: "Table pattern", patternHref: "#/students",
      note: "This list reuses the <b>Table pattern</b> (see Students). Company profiles reuse the <b>Record Detail pattern</b> (open any student row). Cards with logos reuse the <b>Card Grid pattern</b> (see Placement Drives).",
      cta: "Open table template", ctaHref: "#/students" } },
  "/jobs":       { screen: "screen-placeholder", nav: "jobs", ph: {
      title: "Jobs & Internships", sub: "Listings shared with students",
      pattern: "Table + Form patterns", patternHref: "#/jobs/new",
      note: "The listings index reuses the <b>Table pattern</b> with status tabs. The creation flow is fully wired — open the <b>Form pattern</b> template.",
      cta: "Open form template", ctaHref: "#/jobs/new" } },
  "/jobs/new":   { screen: "screen-job-form",  nav: "jobs" },
  "/drives":     { screen: "screen-drives",    nav: "drives" },
  "/applications": { screen: "screen-placeholder", nav: "applications", ph: {
      title: "Applications", sub: "Every student application, across drives",
      pattern: "Table pattern + status chips", patternHref: "#/students",
      note: "Reuses the <b>Table pattern</b> with status filter chips (Applied → Shortlisted → Interview → Offer) and a per-row stage dropdown. Row click opens the <b>Record Detail pattern</b>.",
      cta: "Open table template", ctaHref: "#/students" } },
  "/offers":     { screen: "screen-offers",    nav: "offers" },
  "/reports":    { screen: "screen-reports",   nav: "reports" },
  "/settings":   { screen: "screen-settings",  nav: "settings" },
};

function route() {
  const hash = location.hash.replace("#", "") || "/dashboard";
  const r = ROUTES[hash] || ROUTES["/dashboard"];

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("on"));
  const el = document.getElementById(r.screen);
  if (r.screen === "screen-placeholder" && r.ph) fillPlaceholder(r.ph);
  if (el) el.classList.add("on");

  document.querySelectorAll(".nav a[data-nav]").forEach(a => {
    a.classList.toggle("active", a.dataset.nav === r.nav);
  });

  closeSidebar();
  document.querySelector(".content").scrollTop = 0;
  window.scrollTo(0, 0);
}

function fillPlaceholder(ph) {
  document.getElementById("ph-title").textContent = ph.title;
  document.getElementById("ph-sub").textContent = ph.sub;
  document.getElementById("ph-pattern").textContent = ph.pattern;
  document.getElementById("ph-pattern").href = ph.patternHref;
  document.getElementById("ph-note-body").innerHTML = ph.note;
  const cta = document.getElementById("ph-cta");
  cta.textContent = ph.cta;
  cta.setAttribute("href", ph.ctaHref);
}

/* ---------------- Sidebar (mobile) ---------------- */
function openSidebar() {
  document.querySelector(".sidebar").classList.add("open");
  document.querySelector(".sb-overlay").classList.add("on");
}
function closeSidebar() {
  document.querySelector(".sidebar").classList.remove("open");
  document.querySelector(".sb-overlay").classList.remove("on");
}

/* ---------------- Dropdowns ---------------- */
function toggleDD(id) {
  const dd = document.getElementById(id);
  const wasOn = dd.classList.contains("on");
  document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("on"));
  if (!wasOn) dd.classList.add("on");
}
document.addEventListener("click", e => {
  if (!e.target.closest(".dd-wrap")) {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("on"));
  }
});

/* ---------------- Modal ---------------- */
function openModal(id) { document.getElementById(id).classList.add("on"); }
function closeModal(id) { document.getElementById(id).classList.remove("on"); }
document.addEventListener("keydown", e => {
  if (e.key === "Escape") document.querySelectorAll(".modal-veil.on").forEach(m => m.classList.remove("on"));
});
document.querySelectorAll(".modal-veil").forEach(v => {
  v.addEventListener("click", e => { if (e.target === v) v.classList.remove("on"); });
});

/* ---------------- Toast ---------------- */
function toast(msg) {
  const box = document.querySelector(".toasts");
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = icon("check") + `<span>${msg}</span>`;
  box.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(() => t.remove(), 320); }, 3200);
}

/* ---------------- Students table ---------------- */
let selectedRows = new Set();

function renderStudents() {
  const tbody = document.getElementById("students-tbody");
  tbody.innerHTML = STUDENTS.map(s => `
    <tr data-id="${s.id}" class="${selectedRows.has(s.id) ? "checked" : ""}">
      <td style="width:36px"><input type="checkbox" class="row-check" data-id="${s.id}" ${selectedRows.has(s.id) ? "checked" : ""} style="width:16px;height:16px;accent-color:#1c1c21"></td>
      <td>
        <div class="cell-main">
          <span class="avatar"></span>
          <div><a class="rowlink" href="#/students/detail">${s.name}</a><small>${s.reg}</small></div>
        </div>
      </td>
      <td>${s.dept}</td>
      <td>${s.year}</td>
      <td class="num">${s.cgpa.toFixed(1)}</td>
      <td>${STATUS_BADGE[s.status]}</td>
      <td class="num">${s.offers || "—"}</td>
      <td><small style="color:var(--ink-3)">${s.active}</small></td>
      <td style="width:44px"><button class="kebab" onclick="toast('Row actions: View · Edit · Message · Archive')" title="Row actions">${icon("dots")}</button></td>
    </tr>`).join("");

  tbody.querySelectorAll(".row-check").forEach(cb => {
    cb.addEventListener("change", () => {
      const id = +cb.dataset.id;
      cb.checked ? selectedRows.add(id) : selectedRows.delete(id);
      cb.closest("tr").classList.toggle("checked", cb.checked);
      syncBulk();
    });
  });
  syncBulk();
  syncSelectAll();
}

function syncBulk() {
  const bar = document.getElementById("bulk-bar");
  document.getElementById("bulk-count").textContent = selectedRows.size;
  bar.classList.toggle("on", selectedRows.size > 0);
}
function syncSelectAll() {
  const all = document.getElementById("check-all");
  all.checked = selectedRows.size === STUDENTS.length && STUDENTS.length > 0;
  all.indeterminate = selectedRows.size > 0 && selectedRows.size < STUDENTS.length;
}
function toggleSelectAll(master) {
  selectedRows = master.checked ? new Set(STUDENTS.map(s => s.id)) : new Set();
  renderStudents();
}
function clearSelection() { selectedRows = new Set(); renderStudents(); }

/* ---------------- Generic chip toggle (single-select groups) ---------------- */
document.querySelectorAll("[data-chip-group]").forEach(group => {
  group.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    group.querySelectorAll(".chip").forEach(c => c.classList.remove("on"));
    chip.classList.add("on");
  });
});

/* ---------------- Tabs (generic) ---------------- */
document.querySelectorAll("[data-tabs]").forEach(tabset => {
  tabset.addEventListener("click", e => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    const scope = tabset.closest("[data-tab-scope]");
    scope.querySelectorAll(".tabs button").forEach(b => b.classList.remove("on"));
    btn.classList.add("on");
    scope.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("on"));
    scope.querySelector("#" + btn.dataset.tab).classList.add("on");
  });
});

/* ---------------- Settings nav ---------------- */
function settingsTab(btn, panelId) {
  const wrap = btn.closest(".settings-layout");
  wrap.querySelectorAll(".settings-nav button").forEach(b => b.classList.remove("on"));
  btn.classList.add("on");
  wrap.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("on"));
  wrap.querySelector("#" + panelId).classList.add("on");
}

/* ---------------- Job form ---------------- */
function updateCount(el, target) {
  document.getElementById(target).textContent = el.value.length;
}
function validateJobForm(e) {
  e.preventDefault();
  let ok = true;
  ["jf-title", "jf-desc"].forEach(id => {
    const input = document.getElementById(id);
    const field = input.closest(".field");
    const bad = !input.value.trim();
    field.classList.toggle("error", bad);
    if (bad) ok = false;
  });
  if (!ok) {
    toast("Please fix the highlighted fields");
    document.querySelector(".field.error").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  toast("Job published — students matching eligibility will be notified");
}
function saveDraft() { toast("Draft saved · autosaved just now"); }

/* tag input (demo) */
document.querySelectorAll(".tag-input").forEach(box => {
  const input = box.querySelector("input");
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && input.value.trim()) {
      e.preventDefault();
      const pill = document.createElement("span");
      pill.className = "tag-pill";
      pill.innerHTML = `${input.value.trim()}<button type="button" aria-label="remove">×</button>`;
      pill.querySelector("button").onclick = () => pill.remove();
      box.insertBefore(pill, input);
      input.value = "";
    }
  });
  box.querySelectorAll(".tag-pill button").forEach(b => b.onclick = () => b.parentElement.remove());
});

/* ---------------- Offers screen: toggle empty vs populated ---------------- */
function offersView(mode) {
  document.getElementById("offers-empty").style.display = mode === "empty" ? "block" : "none";
  document.getElementById("offers-table").style.display = mode === "empty" ? "none" : "block";
  document.querySelectorAll("#offers-view-toggle .chip").forEach(c =>
    c.classList.toggle("on", c.dataset.mode === mode));
  if (mode !== "empty" && typeof offerTable !== "undefined") offerTable.render();
}

/* ---------------- Boot ---------------- */
window.addEventListener("hashchange", route);
renderStudents();
route();

/* ============================================================
   v2 — review-driven additions
   ============================================================ */

/* ---------- Extended router (auth + new screens) ---------- */
const AUTH_ROUTES = {
  "/auth/signin": "auth-signin",
  "/auth/signup": "auth-signup",
  "/auth/forgot": "auth-forgot",
  "/auth/invite": "auth-invite",
  "/auth/2fa": "auth-2fa",
  "/auth/locked": "auth-locked",
};
ROUTES["/notifications"] = { screen: "screen-notifications", nav: null };
ROUTES["/profile"]       = { screen: "screen-profile", nav: null };
ROUTES["/billing"]       = { screen: "screen-billing", nav: "settings" };
ROUTES["/search"]        = { screen: "screen-search", nav: null };
ROUTES["/error/404"]     = { screen: "screen-error", nav: null };
ROUTES["/error/403"]     = { screen: "screen-error", nav: null };
ROUTES["/error/500"]     = { screen: "screen-error", nav: null };

const _origRoute = route;
route = function () {
  const hash = location.hash.replace("#", "") || "/dashboard";

  if (hash.startsWith("/auth/")) {
    document.querySelector(".shell").style.display = "none";
    document.getElementById("auth-shell").classList.add("on");
    document.querySelectorAll(".auth-screen").forEach(s => s.style.display = "none");
    const el = document.getElementById(AUTH_ROUTES[hash] || "auth-signin");
    if (el) el.style.display = "block";
    if ((AUTH_ROUTES[hash] || "auth-signin") === "auth-signin" && typeof drawCaptcha === "function") drawCaptcha();
    window.scrollTo(0, 0);
    return;
  }
  document.querySelector(".shell").style.display = "";
  document.getElementById("auth-shell").classList.remove("on");

  _origRoute();

  /* unknown route → real 404 instead of silently falling back to dashboard */
  if (!ROUTES[hash]) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("on"));
    document.getElementById("screen-error").classList.add("on");
    errorVariant("404");
    document.querySelectorAll(".nav a[data-nav]").forEach(a => a.classList.remove("active"));
    document.getElementById("err-desc").textContent =
      ERRORS["404"].desc + " Requested path: " + hash;
    return;
  }

  if (hash.startsWith("/error/")) {
    const code = hash.split("/")[2] || "404";
    errorVariant(code, document.querySelector(`#error-variant-chips .chip[onclick*="'${code}'"]`));
  }
};

/* ---------- Toast variants + Undo ---------- */
const _origToast = toast;
toast = function (msg, type = "success", undoLabel = null) {
  const box = document.querySelector(".toasts");
  const t = document.createElement("div");
  t.className = "toast" + (type !== "success" ? " " + type : "");
  const ic = type === "error" ? "x" : type === "warning" ? "bell" : type === "info" ? "help" : "check";
  t.innerHTML = icon(ic) + `<span>${msg}</span>` + (undoLabel ? `<button class="undo" onclick="this.closest('.toast').remove();_origToast('Action undone')">${undoLabel}</button>` : "");
  box.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(() => t.remove(), 320); }, 3600);
};

/* ---------- Side drawer ---------- */
function openDrawer(id) {
  document.getElementById("drawer-veil").classList.add("on");
  document.getElementById(id).classList.add("on");
}
function closeDrawers() {
  document.getElementById("drawer-veil").classList.remove("on");
  document.querySelectorAll(".drawer").forEach(d => d.classList.remove("on"));
}

/* ---------- Global search typeahead ---------- */
const SEARCH_INDEX = [
  { group: "Students", items: [["Aarav Sharma", "CS21-1042", "#/students/detail"], ["Aarav Bhosale", "ME21-0721", "#/students/detail"], ["Priya Nair", "EC21-0871", "#/students/detail"]] },
  { group: "Employers", items: [["Acme Corp", "12 drives · verified", "#/employers"], ["TechNova", "8 drives · verified", "#/employers"]] },
  { group: "Jobs & drives", items: [["Software Engineer — Acme", "closes Oct 12", "#/drives"], ["Data Analyst — TechNova", "closes Oct 16", "#/drives"]] },
];
function searchTypeahead(q) {
  const dd = document.getElementById("search-dd");
  if (!dd) return;
  q = (q || "").trim().toLowerCase();
  if (q.length < 2) { dd.classList.remove("on"); return; }
  const hl = s => s.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"), "<mark>$1</mark>");
  let html = "", hits = 0;
  SEARCH_INDEX.forEach(g => {
    const items = g.items.filter(i => i[0].toLowerCase().includes(q) || i[1].toLowerCase().includes(q));
    if (!items.length) return;
    html += `<div class="sr-group">${g.group}</div>`;
    items.forEach(i => { hits++; html += `<button class="sr-item" onclick="location.hash='${i[2]}';document.getElementById('search-dd').classList.remove('on')"><b>${hl(i[0])}</b><small>${hl(i[1])}</small></button>`; });
  });
  if (!hits) html = `<div class="sr-group">No quick matches — press Enter for full search</div>`;
  html += `<button class="sr-item" style="justify-content:center;color:var(--link)" onclick="location.hash='#/search';document.getElementById('search-dd').classList.remove('on')">See all results for “${q}” →</button>`;
  dd.innerHTML = html;
  dd.classList.add("on");
}
document.addEventListener("click", e => {
  if (!e.target.closest(".topbar .search")) document.getElementById("search-dd")?.classList.remove("on");
});

/* ---------- Students table: states + row menus ---------- */
function tableState(mode, btn) {
  document.querySelectorAll("#table-state-demo button").forEach(b => b.classList.remove("on"));
  if (btn) btn.classList.add("on");
  document.getElementById("students-table-wrap").style.display = mode === "data" ? "" : "none";
  document.getElementById("students-skeleton").style.display = mode === "loading" ? "" : "none";
  document.getElementById("students-noresults").style.display = mode === "noresults" ? "" : "none";
}

const _origRenderStudents = renderStudents;
renderStudents = function () {
  _origRenderStudents();
  document.querySelectorAll("#students-tbody tr").forEach(tr => {
    const cell = tr.lastElementChild;
    const id = tr.dataset.id;
    cell.innerHTML = `
      <span class="dd-wrap">
        <button class="kebab" onclick="toggleDD('dd-row-${id}')" title="Row actions">${icon("dots")}</button>
        <span class="dropdown narrow" id="dd-row-${id}">
          <button class="dd-item" onclick="location.hash='#/students/detail'">View profile</button>
          <button class="dd-item" onclick="openModal('modal-edit-student')">Edit</button>
          <button class="dd-item" onclick="_origToast('Message composer opens')">Message</button>
          <div class="dd-sep"></div>
          <button class="dd-item" style="color:var(--bad-ink)" onclick="openModal('modal-confirm-archive')">Archive</button>
        </span>
      </span>`;
  });
};
renderStudents();

/* ---------- Import wizard ---------- */
let currentIStep = 1;
function importStep(n) {
  currentIStep = Math.max(1, Math.min(4, n));
  document.querySelectorAll(".istep").forEach(s => s.style.display = "none");
  document.getElementById("istep-" + currentIStep).style.display = "";
  document.querySelectorAll("#import-stepper .step").forEach(st => {
    const sn = +st.dataset.istep;
    st.classList.toggle("on", sn === currentIStep);
    st.classList.toggle("done", sn < currentIStep);
  });
  document.getElementById("import-back").style.display = currentIStep > 1 && currentIStep < 4 ? "" : "none";
  const next = document.getElementById("import-next");
  next.style.display = currentIStep < 4 ? "" : "none";
  next.textContent = currentIStep === 3 ? "Import 1,261 rows" : "Continue";
}

/* ---------- Job form: loading submit, error summary, dirty guard ---------- */
let jobFormDirty = false;
document.getElementById("job-form-wrap")?.addEventListener("input", () => jobFormDirty = true);

validateJobForm = function (e) {
  e.preventDefault();
  const summary = document.getElementById("jf-error-summary");
  let ok = true;
  ["jf-title", "jf-desc"].forEach(id => {
    const input = document.getElementById(id);
    const field = input.closest(".field");
    const bad = !input.value.trim();
    field.classList.toggle("error", bad);
    if (bad) ok = false;
  });
  summary.style.display = ok ? "none" : "flex";
  if (!ok) {
    toast("Please fix the highlighted fields", "error");
    document.querySelector(".field.error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const btn = document.getElementById("jf-publish");
  btn.classList.add("loading");
  btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove("loading"); btn.disabled = false;
    jobFormDirty = false;
    document.getElementById("job-form-wrap").style.display = "none";
    document.getElementById("job-success").style.display = "";
    window.scrollTo(0, 0);
  }, 900);
};

function guardLeave(target) {
  if (jobFormDirty) {
    openModal("modal-dirty");
    document.getElementById("dirty-continue").onclick = () => { jobFormDirty = false; closeModal("modal-dirty"); location.hash = target; };
  } else {
    location.hash = target;
  }
}

/* unsaved-changes guard modal (built once) */
(function () {
  const v = document.createElement("div");
  v.className = "modal-veil"; v.id = "modal-dirty";
  v.innerHTML = `
    <div class="modal small">
      <div class="m-head"><h3>Discard unsaved changes?</h3><button class="kebab" onclick="closeModal('modal-dirty')">${icon("x")}</button></div>
      <div class="m-body"><p style="font-size:13.5px;color:var(--ink-2)">You have unsaved edits in this form. Leaving now will discard them — a draft was autosaved 2 minutes ago.</p></div>
      <div class="m-foot">
        <button class="btn" onclick="closeModal('modal-dirty')">Keep editing</button>
        <button class="btn danger" id="dirty-continue">Discard &amp; leave</button>
      </div>
    </div>`;
  document.body.appendChild(v);
  v.addEventListener("click", e => { if (e.target === v) v.classList.remove("on"); });
})();

/* ---------- Upload simulation (progress → success + error states) ---------- */
function simulateUpload() {
  const row = document.getElementById("file-row-1");
  const bar = document.getElementById("file-prog");
  const err = document.getElementById("file-row-err");
  const done = document.getElementById("file-row-done");
  if (!row) return;
  row.style.display = ""; bar.style.width = "0%";
  let p = 0;
  const t = setInterval(() => {
    p += 10; bar.style.width = p + "%";
    if (p >= 100) {
      clearInterval(t);
      row.querySelector("small").textContent = "2.4 MB — uploaded";
      row.querySelector(".progress")?.remove();
      done.style.display = "";
      err.style.display = "";
    }
  }, 120);
}

/* ---------- Drives: states + load more ---------- */
function drivesState(mode, btn) {
  document.querySelectorAll("#drives-state-demo button").forEach(b => b.classList.remove("on"));
  if (btn) btn.classList.add("on");
  document.getElementById("drives-grid-wrap").style.display = mode === "data" ? "" : "none";
  document.getElementById("drives-noresults").style.display = mode === "noresults" ? "" : "none";
  document.getElementById("drives-loadmore").style.display = mode === "data" ? "" : "none";
}
function loadMoreDrives(btn) {
  btn.classList.add("loading"); btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove("loading"); btn.disabled = false;
    toast("6 more drives appended — 12 of 24 shown");
  }, 800);
}

/* ---------- Dashboard widget state demo ---------- */
function widgetState(btn, mode) {
  btn.parentElement.querySelectorAll("button").forEach(b => b.classList.remove("on"));
  btn.classList.add("on");
  const body = document.getElementById("widget-state-body");
  if (mode === "loading") {
    body.innerHTML = `<div class="skel" style="height:16px;width:45%;margin-bottom:14px"></div>
      <div class="skel" style="height:120px;margin-bottom:14px"></div>
      <div class="skel" style="height:12px;width:70%;margin-bottom:8px"></div>
      <div class="skel" style="height:12px;width:55%"></div>`;
  } else if (mode === "empty") {
    body.innerHTML = `<div class="widget-empty"><b>No data for this range yet</b>Once the first drive completes, placement stats appear here.<br><button class="btn sm" style="margin-top:12px" onclick="location.hash='#/jobs/new'">Schedule a drive</button></div>`;
  } else {
    body.innerHTML = `<div class="widget-empty" style="color:var(--bad-ink)"><b style="color:var(--bad-ink)">Couldn't load this widget</b><span style="color:var(--ink-3)">The analytics service timed out. Your data is safe.</span><br><button class="btn sm" style="margin-top:12px" onclick="const c=this.closest('.card');widgetState(c.querySelector('.state-demo button'),'loading')">Retry</button></div>`;
  }
}
widgetState(document.querySelector("#screen-dashboard .state-demo button"), "loading");

function refreshDashboard(el) {
  toast("Refreshing dashboard…", "info");
  setTimeout(() => _origToast("Dashboard updated just now"), 900);
}

/* ---------- Error page variants ---------- */
const ERRORS = {
  "404": { code: `4<span>0</span>4`, title: "This page doesn't exist", desc: "The link may be broken, or the record was deleted or moved to another workspace." },
  "403": { code: `4<span>0</span>3`, title: "No permission to view this", desc: "Your Coordinator role is scoped to Electronics. Ask a TPO admin to widen your access, or switch workspace." },
  "500": { code: `5<span>0</span>0`, title: "Something went wrong on our side", desc: "The server hit an unexpected error. We've logged it — reference #ERR-8F2A41. Try again in a moment." },
};
function errorVariant(code, btn) {
  const e = ERRORS[code] || ERRORS["404"];
  document.querySelectorAll("#error-variant-chips .chip").forEach(c => c.classList.remove("on"));
  if (btn) btn.classList.add("on");
  document.getElementById("err-code").innerHTML = e.code;
  document.getElementById("err-title").textContent = e.title;
  document.getElementById("err-desc").textContent = e.desc;
}

/* ---------- Notifications ---------- */
function markAllRead() {
  document.querySelectorAll("#notif-list .notif-row.unread").forEach(r => r.classList.replace("unread", "read"));
}

/* ---------- Settings/profile save with loading ---------- */
function saveSettings(btn) {
  btn.classList.add("loading"); btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove("loading"); btn.disabled = false;
    document.getElementById("settings-dirty")?.style.setProperty("display", "none");
    document.getElementById("profile-dirty")?.style.setProperty("display", "none");
    toast("Changes saved");
  }, 800);
}
document.getElementById("screen-settings")?.addEventListener("change", () =>
  document.getElementById("settings-dirty")?.style.setProperty("display", ""));
document.getElementById("screen-profile")?.addEventListener("change", () =>
  document.getElementById("profile-dirty")?.style.setProperty("display", ""));

/* ---------- Auth helpers ---------- */
function otpNext(input) {
  if (input.value && input.nextElementSibling) input.nextElementSibling.focus();
}
function authSubmit(kind, btn) {
  let ok = true;
  btn.closest(".card").querySelectorAll(".field .input").forEach(inp => {
    const bad = !inp.value.trim();
    inp.closest(".field").classList.toggle("error", bad);
    if (bad) ok = false;
  });
  if (!ok) { toast("Fill in the highlighted fields", "error"); return; }
  if (kind === "signin" && !checkCaptcha()) return;
  btn.classList.add("loading"); btn.disabled = true;
  setTimeout(() => { btn.classList.remove("loading"); btn.disabled = false; location.hash = "#/auth/2fa"; }, 700);
}

/* ---------- Captcha (sign-in security check) ---------- */
let captchaCode = "";
function drawCaptcha() {
  const chars = "ABDEFGHJKMNPQRSTUVWXYZ23456789"; /* no easily-confused glyphs */
  captchaCode = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const cv = document.getElementById("captcha-canvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = "#f4f4f6"; ctx.fillRect(0, 0, cv.width, cv.height);
  for (let i = 0; i < 4; i++) { /* interference curves */
    ctx.strokeStyle = `rgba(70,70,82,${0.12 + Math.random() * 0.18})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.random() * cv.width, Math.random() * cv.height);
    ctx.bezierCurveTo(Math.random() * cv.width, Math.random() * cv.height,
      Math.random() * cv.width, Math.random() * cv.height,
      Math.random() * cv.width, Math.random() * cv.height);
    ctx.stroke();
  }
  for (let i = 0; i < 24; i++) { /* speckle */
    ctx.fillStyle = `rgba(70,70,82,${Math.random() * 0.3})`;
    ctx.fillRect(Math.random() * cv.width, Math.random() * cv.height, 1.6, 1.6);
  }
  captchaCode.split("").forEach((ch, i) => {
    ctx.save();
    ctx.font = `700 ${21 + Math.random() * 6}px Inter, Arial, sans-serif`;
    ctx.fillStyle = "#23232b";
    ctx.translate(16 + i * 30, 30 + Math.random() * 5);
    ctx.rotate((Math.random() - 0.5) * 0.55);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });
}
function checkCaptcha() {
  const inp = document.getElementById("si-captcha");
  if (!inp) return true;
  const good = inp.value.trim().toUpperCase() === captchaCode;
  const field = inp.closest(".field");
  field.classList.toggle("error", !good);
  const err = document.getElementById("si-captcha-err");
  if (err && !good) err.textContent = "Incorrect code — a new one has been generated";
  if (!good) {
    drawCaptcha();
    inp.value = "";
    inp.focus();
    toast("Security code didn't match — try again", "error");
  }
  return good;
}
drawCaptcha();

/* ---------- Keyboard shortcuts ---------- */
document.addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    document.getElementById("global-search")?.focus();
  }
  if (e.key === "?" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
    openModal("modal-shortcuts");
  }
  if (e.key === "Escape") closeDrawers();
});

/* bulk confirm count sync */
(function syncBulkCount() {
  const obs = new MutationObserver(() => {
    const el = document.getElementById("bulk-confirm-count");
    if (el) el.textContent = selectedRows.size || 0;
  });
  const bar = document.getElementById("bulk-count");
  if (bar) obs.observe(bar, { childList: true, characterData: true, subtree: true });
})();

/* re-register router (v1 boot captured the original function reference) */
window.removeEventListener("hashchange", _origRoute);
window.addEventListener("hashchange", route);
route();

/* ============================================================
   v3 — audit pass: behavioral truthfulness + accessibility
   ============================================================ */

/* ---------- Larger sample datasets (make pagination/sort/filter real) ---------- */
STUDENTS.push(
  { id: 11, name: "Ishaan Verma",    reg: "EE21-0530", dept: "Electrical",       year: "Third Year", cgpa: 7.4, status: "open",    offers: 0, active: "3d ago", verified: true, backlogs: 1, dreamSlot: true },
  { id: 12, name: "Riya Kapoor",     reg: "CS21-1201", dept: "Computer Science", year: "Final Year", cgpa: 9.1, status: "placed",  offers: 2, active: "4h ago", verified: false, backlogs: 3, dreamSlot: false },
  { id: 13, name: "Arnav Singh",     reg: "IT22-1011", dept: "Information Tech", year: "Third Year", cgpa: 7.9, status: "process", offers: 0, active: "1d ago", verified: true, backlogs: 1, dreamSlot: false },
  { id: 14, name: "Tanvi Deshmukh",  reg: "EC21-0904", dept: "Electronics",      year: "Final Year", cgpa: 8.6, status: "process", offers: 1, active: "2d ago", verified: false, backlogs: 0, dreamSlot: true },
  { id: 15, name: "Kabir Anand",     reg: "ME21-0688", dept: "Mechanical",       year: "Final Year", cgpa: 6.8, status: "open",    offers: 0, active: "5d ago", verified: true, backlogs: 1, dreamSlot: false },
  { id: 16, name: "Nisha Patel",     reg: "CV21-0471", dept: "Civil",            year: "Final Year", cgpa: 8.2, status: "process", offers: 1, active: "7h ago", verified: true, backlogs: 1, dreamSlot: true },
  { id: 17, name: "Aditya Rao",      reg: "CS21-1130", dept: "Computer Science", year: "Final Year", cgpa: 9.3, status: "placed",  offers: 3, active: "1h ago", verified: false, backlogs: 0, dreamSlot: true },
  { id: 18, name: "Pooja Bhatt",     reg: "IT21-0977", dept: "Information Tech", year: "Final Year", cgpa: 7.2, status: "open",    offers: 0, active: "2d ago", verified: true, backlogs: 0, dreamSlot: true },
  { id: 19, name: "Sahil Khan",      reg: "EE22-0590", dept: "Electrical",       year: "Third Year", cgpa: 8.0, status: "process", offers: 0, active: "6h ago", verified: true, backlogs: 3, dreamSlot: false },
  { id: 20, name: "Ankit Gupta",     reg: "ME21-0742", dept: "Mechanical",       year: "Final Year", cgpa: 7.6, status: "open",    offers: 0, active: "3d ago", verified: false, backlogs: 2, dreamSlot: false },
  { id: 21, name: "Shruti Nair",     reg: "CS22-1255", dept: "Computer Science", year: "Third Year", cgpa: 8.8, status: "process", offers: 1, active: "5h ago", verified: true, backlogs: 1, dreamSlot: false },
  { id: 22, name: "Varun Joshi",     reg: "EC21-0948", dept: "Electronics",      year: "Final Year", cgpa: 9.0, status: "placed",  offers: 2, active: "2h ago", verified: false, backlogs: 2, dreamSlot: false },
  { id: 23, name: "Kavya Reddy",     reg: "IT21-0990", dept: "Information Tech", year: "Final Year", cgpa: 8.5, status: "placed",  offers: 1, active: "4d ago", verified: false, backlogs: 2, dreamSlot: true },
  { id: 24, name: "Nikhil Bose",     reg: "CV21-0502", dept: "Civil",            year: "Final Year", cgpa: 7.0, status: "open",    offers: 0, active: "1d ago", verified: true, backlogs: 0, dreamSlot: true },
  { id: 25, name: "Aishwarya Menon", reg: "CS21-1189", dept: "Computer Science", year: "Final Year", cgpa: 9.5, status: "placed",  offers: 4, active: "3h ago", verified: false, backlogs: 0, dreamSlot: false },
  { id: 26, name: "Rahul Chavan",    reg: "ME22-0801", dept: "Mechanical",       year: "Third Year", cgpa: 7.3, status: "open",    offers: 0, active: "6d ago", verified: true, backlogs: 0, dreamSlot: true },
  { id: 27, name: "Simran Kaur",     reg: "EE21-0544", dept: "Electrical",       year: "Final Year", cgpa: 8.3, status: "process", offers: 1, active: "2d ago", verified: false, backlogs: 1, dreamSlot: false },
  { id: 28, name: "Dev Patel",       reg: "IT22-1033", dept: "Information Tech", year: "Third Year", cgpa: 7.7, status: "open",    offers: 0, active: "1d ago", verified: true, backlogs: 1, dreamSlot: false },
  { id: 29, name: "Gayatri Iyer",    reg: "EC21-0966", dept: "Electronics",      year: "Final Year", cgpa: 8.9, status: "placed",  offers: 2, active: "8h ago", verified: true, backlogs: 1, dreamSlot: true },
  { id: 30, name: "Harsh Vardhan",   reg: "CV21-0519", dept: "Civil",            year: "Final Year", cgpa: 6.5, status: "open",    offers: 0, active: "4d ago", verified: false, backlogs: 1, dreamSlot: false },
  { id: 31, name: "Ishita Rao",      reg: "CS21-1212", dept: "Computer Science", year: "Final Year", cgpa: 8.1, status: "process", offers: 0, active: "5h ago", verified: true, backlogs: 0, dreamSlot: true },
  { id: 32, name: "Manav Shah",      reg: "IT21-1002", dept: "Information Tech", year: "Final Year", cgpa: 9.2, status: "placed",  offers: 3, active: "2h ago", verified: true, backlogs: 2, dreamSlot: false },
  { id: 33, name: "Neha Kulkarni",   reg: "EE21-0561", dept: "Electrical",       year: "Final Year", cgpa: 7.5, status: "open",    offers: 0, active: "3d ago", verified: true, backlogs: 2, dreamSlot: false },
  { id: 34, name: "Omkar Joshi",     reg: "ME21-0766", dept: "Mechanical",       year: "Final Year", cgpa: 8.4, status: "process", offers: 1, active: "1d ago", verified: true, backlogs: 1, dreamSlot: false },
  { id: 35, name: "Prerna Singh",    reg: "EC22-0991", dept: "Electronics",      year: "Third Year", cgpa: 7.8, status: "open",    offers: 0, active: "2d ago", verified: false, backlogs: 3, dreamSlot: true },
  { id: 36, name: "Yash Thakur",     reg: "CV21-0530", dept: "Civil",            year: "Final Year", cgpa: 8.0, status: "process", offers: 1, active: "6h ago", verified: true, backlogs: 0, dreamSlot: false }
);

const EMPLOYERS = [
  { id: 1,  name: "Acme Corp",           industry: "SaaS",             drives: 12, hires: 24, rel: "Strategic", status: "active"  },
  { id: 2,  name: "TechNova",            industry: "SaaS",             drives: 8,  hires: 18, rel: "Strategic", status: "active"  },
  { id: 3,  name: "FinEdge",             industry: "Fintech",          drives: 6,  hires: 11, rel: "Warm",      status: "active"  },
  { id: 4,  name: "GreenGrid",           industry: "Core Engineering", drives: 5,  hires: 9,  rel: "Warm",      status: "active"  },
  { id: 5,  name: "OrbitPay",            industry: "Fintech",          drives: 7,  hires: 14, rel: "Strategic", status: "active"  },
  { id: 6,  name: "AutoEdge",            industry: "Manufacturing",    drives: 4,  hires: 7,  rel: "Warm",      status: "active"  },
  { id: 7,  name: "BuildRight",          industry: "Core Engineering", drives: 3,  hires: 5,  rel: "New",       status: "active"  },
  { id: 8,  name: "DataBridge",          industry: "SaaS",             drives: 6,  hires: 10, rel: "Warm",      status: "active"  },
  { id: 9,  name: "QuantLeap",           industry: "Fintech",          drives: 2,  hires: 3,  rel: "New",       status: "pending" },
  { id: 10, name: "MediServe",           industry: "SaaS",             drives: 0,  hires: 0,  rel: "New",       status: "pending", dreamSlot: true },
  { id: 11, name: "UrbanRail",           industry: "Core Engineering", drives: 3,  hires: 4,  rel: "Warm",      status: "dormant", dreamSlot: true },
  { id: 12, name: "ChipCraft",           industry: "Manufacturing",    drives: 5,  hires: 8,  rel: "Strategic", status: "active" , dreamSlot: false },
  { id: 13, name: "AgroNova",            industry: "Manufacturing",    drives: 1,  hires: 2,  rel: "New",       status: "pending", dreamSlot: true },
  { id: 14, name: "BrightHire",          industry: "Consulting",       drives: 4,  hires: 6,  rel: "Warm",      status: "active"  },
  { id: 15, name: "SteelArc",            industry: "Manufacturing",    drives: 2,  hires: 5,  rel: "At risk",   status: "dormant" },
  { id: 16, name: "PaySphere",           industry: "Fintech",          drives: 1,  hires: 0,  rel: "New",       status: "pending" },
  { id: 17, name: "NeuralEdge",          industry: "SaaS",             drives: 3,  hires: 5,  rel: "Warm",      status: "active"  },
  { id: 18, name: "SkyPort Logistics",   industry: "Core Engineering", drives: 0,  hires: 0,  rel: "At risk",   status: "dormant" },
  { id: 19, name: "EcoPack",             industry: "Manufacturing",    drives: 2,  hires: 3,  rel: "Warm",      status: "dormant" },
  { id: 20, name: "Veda Analytics",      industry: "Consulting",       drives: 5,  hires: 9,  rel: "Strategic", status: "active"  },
  { id: 21, name: "HexaLogic",           industry: "SaaS",             drives: 1,  hires: 1,  rel: "New",       status: "pending" },
  { id: 22, name: "Meridian Consulting", industry: "Consulting",       drives: 3,  hires: 4,  rel: "Warm",      status: "active"  },
  { id: 23, name: "ForgeWorks",          industry: "Manufacturing",    drives: 0,  hires: 2,  rel: "At risk",   status: "dormant" },
  { id: 24, name: "CloudKite",           industry: "SaaS",             drives: 2,  hires: 2,  rel: "New",       status: "dormant" },
];
const EMP_STATUS_BADGE = {
  active:  '<span class="badge ok">Active</span>',
  dormant: '<span class="badge neutral">Dormant</span>',
  pending: '<span class="badge warn">Verification pending</span>',
};
const EMP_REL_BADGE = {
  "Strategic": '<span class="badge ok">Strategic</span>',
  "Warm":      '<span class="badge info">Warm</span>',
  "New":       '<span class="badge neutral">New</span>',
  "At risk":   '<span class="badge warn">At risk</span>',
};

/* ---------- Shared query-state table engine (drives Students + Employers) ----------
   One state object {q, filters…, sortKey, sortDir, page, perPage} is the single
   source of truth; every control writes to it, render() reads from it. */
/* demo states toggle (students table template) */
function toggleDemoStates() {
  const row = document.getElementById("table-state-row");
  const btn = document.getElementById("demo-states-toggle");
  if (!row || !btn) return;
  const show = row.style.display === "none" || row.style.display === "";
  row.style.display = show ? "block" : "none";
  btn.innerHTML = show ? "Demo table states &#9650;" : "Demo table states &#9660;";
}

/* report filter reset */
function resetReportFilters() {
  ["rp-season", "rp-dept", "rp-emp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });
  toast("Report filters reset.");
}

function setVal(id, v) { const el = document.getElementById(id); if (el) el.value = v; }
function setText(id, t) { const el = document.getElementById(id); if (el) el.textContent = t; }

function queryTable(cfg) {
  const defaults = Object.assign({}, cfg.extraState);
  const q = Object.assign({ q: "", sortKey: null, sortDir: 1, page: 1, perPage: cfg.perPage || 10 }, cfg.extraState);
  let lastSlice = [];

  function view() {
    let rows = cfg.data.filter(s => cfg.match(s, q));
    if (q.sortKey && cfg.sort[q.sortKey]) {
      const get = cfg.sort[q.sortKey];
      rows = rows.slice().sort((a, b) => {
        const va = get(a), vb = get(b);
        const cmp = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
        return cmp * q.sortDir;
      });
    }
    return rows;
  }

  function paginationHtml(page, pages) {
    const g = cfg.global;
    let html = `<button ${page === 1 ? "disabled" : ""} onclick="${g}.goto(${page - 1})" aria-label="Previous page">‹ Prev</button>`;
    let prev = 0;
    for (let p = 1; p <= pages; p++) {
      if (!(p === 1 || p === pages || Math.abs(p - page) <= 1)) continue;
      if (p - prev > 1) html += `<span style="padding:0 4px;color:var(--ink-4)">…</span>`;
      html += `<button class="${p === page ? "cur" : ""}" ${p === page ? 'aria-current="page"' : ""} onclick="${g}.goto(${p})" aria-label="Page ${p}">${p}</button>`;
      prev = p;
    }
    html += `<button ${page === pages ? "disabled" : ""} onclick="${g}.goto(${page + 1})" aria-label="Next page">Next ›</button>`;
    return html;
  }

  function renderTags() {
    const box = document.getElementById(cfg.ids.tags);
    if (!box) return;
    const tags = cfg.tags(q);
    if (!tags.length) { box.classList.remove("on"); box.innerHTML = ""; return; }
    box.classList.add("on");
    box.innerHTML = tags.map((t, i) =>
      `<span class="filter-tag">${t.label}<button data-ti="${i}" aria-label="Remove filter: ${t.label.replace(/<[^>]*>/g, "")}">×</button></span>`
    ).join("") + `<button class="clear-all">Clear all</button>`;
    box.querySelectorAll("[data-ti]").forEach(b => b.onclick = () => { tags[+b.dataset.ti].onClear(); render(); });
    box.querySelector(".clear-all").onclick = () => api.clear();
  }

  function render() {
    const rows = view();
    const pages = Math.max(1, Math.ceil(rows.length / q.perPage));
    q.page = Math.min(Math.max(1, q.page), pages);
    const slice = rows.slice((q.page - 1) * q.perPage, q.page * q.perPage);
    lastSlice = slice;
    const ids = cfg.ids;

    document.getElementById(ids.tbody).innerHTML = slice.map(cfg.row).join("");
    if (cfg.afterRender) cfg.afterRender(slice, rows);

    setText(ids.count, `Showing ${slice.length} of ${rows.length}`);
    if (ids.exportCount) setText(ids.exportCount, `${rows.length} rows · current filters`);
    setText(ids.pgInfo, `Page ${q.page} of ${pages}`);
    const pb = document.getElementById(ids.pgButtons);
    if (pb) pb.innerHTML = paginationHtml(q.page, pages);

    const noRows = rows.length === 0;
    if (ids.noresults) document.getElementById(ids.noresults).style.display = noRows ? "" : "none";
    if (ids.wrap) document.getElementById(ids.wrap).style.display = noRows ? "none" : "";
    if (ids.pagination) document.getElementById(ids.pagination).style.display = noRows ? "none" : "";

    if (ids.tags) renderTags();
    if (cfg.chipCounts) cfg.chipCounts();

    if (cfg.sortAttr) {
      document.querySelectorAll(`${cfg.scope} [${cfg.sortAttr}]`).forEach(btn => {
        const th = btn.closest("th");
        const key = btn.getAttribute(cfg.sortAttr);
        const active = q.sortKey === key;
        th.setAttribute("aria-sort", active ? (q.sortDir === 1 ? "ascending" : "descending") : "none");
        th.classList.toggle("sorted", active);
        const ind = btn.querySelector(".sort-ind");
        if (ind) ind.textContent = active ? (q.sortDir === 1 ? "▲" : "▼") : "⇅";
      });
    }
  }

  const api = {
    q, render,
    set(patch) { Object.assign(q, patch); if (!("page" in patch)) q.page = 1; render(); },
    sort(key) { if (q.sortKey === key) q.sortDir *= -1; else { q.sortKey = key; q.sortDir = 1; } q.page = 1; render(); },
    goto(p) { q.page = p; render(); },
    perPage(n) { q.perPage = n; q.page = 1; render(); },
    clear() {
      if (cfg.clearControls) cfg.clearControls();
      Object.keys(q).forEach(k => { delete q[k]; });
      Object.assign(q, { q: "", sortKey: null, sortDir: 1, page: 1, perPage: cfg.perPage || 10 }, defaults);
      render();
    },
    currentRows: () => lastSlice,
    viewRows: () => view(),
    cfgData: () => cfg.data,
    removeRow(id) {
      const i = cfg.data.findIndex(r => r.id === id);
      if (i >= 0) cfg.data.splice(i, 1);
      render();
    },
    restoreRows(rows) {
      cfg.data.push(...rows);
      render();
    },
  };
  return api;
}

/* ---------- Students: live query state ---------- */
const STUDENT_STATUS_LABEL = { placed: "Placed", process: "In process", open: "Not placed" };
function syncStChips() {
  document.querySelectorAll("#screen-students [data-status]").forEach(c =>
    c.classList.toggle("on", c.dataset.status === stTable.q.status));
}

const stTable = queryTable({
  global: "stTable",
  scope: "#screen-students",
  data: STUDENTS,
  perPage: 10,
  extraState: { dept: "", year: "", minCgpa: 0, status: "all", depts: null, cgpaMax: null, backlogs: "any", verifiedOnly: false, dreamOnly: false },
  ids: {
    tbody: "students-tbody", count: "st-count", exportCount: "export-count",
    pgInfo: "pg-info", pgButtons: "pg-buttons", pagination: "students-pagination",
    tags: "filter-tags", noresults: "students-noresults", wrap: "students-table-wrap",
  },
  sortAttr: "data-key",
  sort: { name: s => s.name, dept: s => s.dept, cgpa: s => s.cgpa },
  match(s, q) {
    const needle = q.q.trim().toLowerCase();
    if (needle && !(s.name.toLowerCase().includes(needle) || s.reg.toLowerCase().includes(needle))) return false;
    if (q.dept && s.dept !== q.dept) return false;
    if (q.year && s.year !== q.year) return false;
    if (+q.minCgpa && s.cgpa < +q.minCgpa) return false;
    if (q.status !== "all" && s.status !== q.status) return false;
    if (q.depts && q.depts.length && !q.depts.includes(s.dept)) return false;
    if (q.cgpaMax != null && q.cgpaMax !== "" && s.cgpa > +q.cgpaMax) return false;
    if (q.backlogs === "none" && (s.backlogs || 0) > 0) return false;
    if (q.backlogs === "max2" && (s.backlogs || 0) > 2) return false;
    if (q.verifiedOnly && !s.verified) return false;
    if (q.dreamOnly && !s.dreamSlot) return false;
    return true;
  },
  row(s) {
    return `
    <tr data-id="${s.id}" class="${selectedRows.has(s.id) ? "checked" : ""}">
      <td style="width:36px"><input type="checkbox" class="row-check" data-id="${s.id}" ${selectedRows.has(s.id) ? "checked" : ""} style="width:16px;height:16px;accent-color:#1c1c21" aria-label="Select ${s.name}"></td>
      <td>
        <div class="cell-main">
          <span class="avatar"></span>
          <div><a class="rowlink" href="#/students/detail">${s.name}</a><small>${s.reg}</small></div>
        </div>
      </td>
      <td>${s.dept}</td>
      <td>${s.year}</td>
      <td class="num">${s.cgpa.toFixed(1)}</td>
      <td>${STATUS_BADGE[s.status]}</td>
      <td class="num">${s.offers || "—"}</td>
      <td><small style="color:var(--ink-3)">${s.active}</small></td>
      <td style="width:44px">
        <span class="dd-wrap">
          <button class="kebab" onclick="toggleDD('dd-row-${s.id}',this)" aria-label="Row actions for ${s.name}" aria-haspopup="true" aria-expanded="false">${icon("dots")}</button>
          <span class="dropdown narrow" id="dd-row-${s.id}" role="menu">
            <button class="dd-item" onclick="location.hash='#/students/detail'">View profile</button>
            <button class="dd-item" onclick="openModal('modal-edit-student')">Edit</button>
            <button class="dd-item" onclick="toast('Message composer opens')">Message</button>
            <div class="dd-sep"></div>
            <button class="dd-item" style="color:var(--bad-ink)" onclick="pendingArchive={table:stTable,ids:[${s.id}],noun:'student'};openModal('modal-confirm-archive')">Archive</button>
          </span>
        </span>
      </td>
    </tr>`;
  },
  afterRender(slice) {
    document.querySelectorAll("#students-tbody .row-check").forEach(cb => {
      cb.addEventListener("change", () => {
        const id = +cb.dataset.id;
        cb.checked ? selectedRows.add(id) : selectedRows.delete(id);
        cb.closest("tr").classList.toggle("checked", cb.checked);
        syncBulk();
        syncSelectAll();
      });
    });
    syncSelectAll();
    syncBulk();
  },
  tags(q) {
    const t = [];
    if (q.q.trim()) t.push({ label: `Search: “${q.q.trim()}”`, onClear() { setVal("st-search", ""); q.q = ""; } });
    if (q.dept) t.push({ label: `Dept: ${q.dept}`, onClear() { setVal("st-dept", ""); q.dept = ""; } });
    if (q.year) t.push({ label: `Year: ${q.year}`, onClear() { setVal("st-year", ""); q.year = ""; } });
    if (+q.minCgpa) t.push({ label: `CGPA ≥ ${q.minCgpa}.0`, onClear() { setVal("st-cgpa", "0"); q.minCgpa = 0; } });
    if (q.status !== "all") t.push({ label: `Status: ${STUDENT_STATUS_LABEL[q.status]}`, onClear() { q.status = "all"; syncStChips(); } });
    if (q.depts && q.depts.length) t.push({ label: `Depts: ${q.depts.length} selected`, onClear() { q.depts = null; syncDrawerControls(); } });
    if (q.cgpaMax != null && q.cgpaMax !== "") t.push({ label: `CGPA ≤ ${q.cgpaMax}`, onClear() { q.cgpaMax = null; setVal("df-cgpa-max", ""); } });
    if (q.backlogs !== "any") t.push({ label: `Backlogs: ${q.backlogs === "none" ? "none only" : "up to 2"}`, onClear() { q.backlogs = "any"; setVal("df-backlogs", "any"); } });
    if (q.verifiedOnly) t.push({ label: "Verified by TPO", onClear() { q.verifiedOnly = false; const c = document.getElementById("df-verified"); if (c) c.checked = false; } });
    if (q.dreamOnly) t.push({ label: "Dream-slot eligible", onClear() { q.dreamOnly = false; const c = document.getElementById("df-dream"); if (c) c.checked = false; } });
    return t;
  },
  chipCounts() {
    const c = { all: STUDENTS.length, placed: 0, process: 0, open: 0 };
    STUDENTS.forEach(s => { if (c[s.status] !== undefined) c[s.status]++; });
    document.querySelectorAll("#screen-students [data-status]").forEach(ch => {
      const n = ch.querySelector(".n");
      if (n) n.textContent = c[ch.dataset.status];
    });
  },
  clearControls() {
    setVal("st-search", ""); setVal("st-dept", ""); setVal("st-year", ""); setVal("st-cgpa", "0");
    resetDrawerControls();
    syncStChips();
  },
});
window.stTable = stTable;
renderStudents = function () { stTable.render(); };
clearQuery = function () { stTable.clear(); };
setPerPage = function (n) { stTable.perPage(n); };
syncSelectAll = function () {
  const all = document.getElementById("check-all");
  if (!all) return;
  const ids = stTable.currentRows().map(s => s.id);
  const sel = ids.filter(id => selectedRows.has(id)).length;
  all.checked = ids.length > 0 && sel === ids.length;
  all.indeterminate = sel > 0 && sel < ids.length;
};
toggleSelectAll = function (master) {
  stTable.currentRows().forEach(s => master.checked ? selectedRows.add(s.id) : selectedRows.delete(s.id));
  stTable.render();
};
syncBulk = function () {
  const n = selectedRows.size;
  setText("bulk-count", n);
  const bar = document.getElementById("bulk-bar");
  bar.classList.toggle("idle", n === 0);
  bar.classList.toggle("on", n > 0);
  ["ba-msg", "ba-exp", "ba-short", "ba-arch", "ba-clear"].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.disabled = n === 0;
  });
};

/* students control wiring */
(function wireStudents() {
  document.getElementById("st-search")?.addEventListener("input", e => stTable.set({ q: e.target.value }));
  document.getElementById("st-dept")?.addEventListener("change", e => stTable.set({ dept: e.target.value }));
  document.getElementById("st-year")?.addEventListener("change", e => stTable.set({ year: e.target.value }));
  document.getElementById("st-cgpa")?.addEventListener("change", e => stTable.set({ minCgpa: e.target.value }));
  document.querySelector("#screen-students .chip-row[data-chip-group]")?.addEventListener("click", e => {
    const chip = e.target.closest("[data-status]");
    if (chip) stTable.set({ status: chip.dataset.status });
  });
  document.querySelectorAll("#screen-students .th-sort[data-key]").forEach(b =>
    b.addEventListener("click", () => stTable.sort(b.dataset.key)));
})();

/* ---------- Saved views: capture + restore Students query state ---------- */
const savedViews = (() => { try { return JSON.parse(localStorage.getItem("pd-views") || "[]"); } catch { return []; } })();

function snapshotStControls() {
  return {
    q: document.getElementById("st-search")?.value || "",
    dept: document.getElementById("st-dept")?.value || "",
    year: document.getElementById("st-year")?.value || "",
    minCgpa: document.getElementById("st-cgpa")?.value || "0",
    status: stTable.q.status,
    sortKey: stTable.q.sortKey, sortDir: stTable.q.sortDir,
    depts: stTable.q.depts, cgpaMax: stTable.q.cgpaMax,
    backlogs: stTable.q.backlogs, verifiedOnly: stTable.q.verifiedOnly, dreamOnly: stTable.q.dreamOnly,
  };
}
function applyStControls(v) {
  setVal("st-search", v.q); setVal("st-dept", v.dept); setVal("st-year", v.year); setVal("st-cgpa", v.minCgpa);
  stTable.q.q = v.q; stTable.q.dept = v.dept; stTable.q.year = v.year; stTable.q.minCgpa = v.minCgpa;
  stTable.q.status = v.status || "all";
  stTable.q.depts = v.depts ?? null;
  stTable.q.cgpaMax = v.cgpaMax ?? null;
  stTable.q.backlogs = v.backlogs || "any";
  stTable.q.verifiedOnly = !!v.verifiedOnly;
  stTable.q.dreamOnly = !!v.dreamOnly;
  syncStChips();
  syncDrawerControls();
  stTable.q.sortKey = v.sortKey; stTable.q.sortDir = v.sortDir || 1;
}
function describeView(v) {
  const bits = [];
  if (v.q.trim()) bits.push(`“${v.q.trim()}”`);
  if (v.dept) bits.push(v.dept);
  if (v.year) bits.push(v.year);
  if (+v.minCgpa) bits.push(`CGPA ≥ ${v.minCgpa}`);
  if (v.cgpaMax != null && v.cgpaMax !== "") bits.push(`≤ ${v.cgpaMax}`);
  if (v.depts && v.depts.length) bits.push(`${v.depts.length} dept${v.depts.length > 1 ? "s" : ""}`);
  if (v.backlogs && v.backlogs !== "any") bits.push("no backlogs");
  if (v.verifiedOnly) bits.push("verified");
  if (v.dreamOnly) bits.push("dream-slot");
  if (v.status && v.status !== "all") bits.push(STUDENT_STATUS_LABEL[v.status]);
  return bits.join(" · ") || "All students";
}
function renderViewList() {
  const box = document.getElementById("view-list");
  if (!box) return;
  if (!savedViews.length) {
    box.innerHTML = `<p style="padding:9px 12px;margin:0;font-size:12.5px;color:var(--ink-3)">No saved views yet — set filters, then use “Save as view” in More filters.</p>`;
    return;
  }
  box.innerHTML = savedViews.map((v, i) => `
    <div class="dd-item" style="display:flex;align-items:center;gap:4px;cursor:pointer" role="menuitem" tabindex="0"
      onclick="applySavedView(${i})" onkeydown="if(event.key==='Enter')applySavedView(${i})">
      <div style="flex:1;min-width:0"><b>${v.name}</b><small style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block">${describeView(v.state)}</small></div>
      <button class="kebab" style="width:30px;height:30px" onclick="event.stopPropagation();deleteSavedView(${i})" aria-label="Delete view ${v.name}">${icon("x")}</button>
    </div>`).join("");
}
saveCurrentView = function () {
  const inp = document.getElementById("save-view-name");
  const name = (inp?.value || "").trim() || describeView(snapshotStControls());
  savedViews.push({ name, state: snapshotStControls() });
  try { localStorage.setItem("pd-views", JSON.stringify(savedViews)); } catch {}
  if (inp) inp.value = "";
  renderViewList();
  closeDrawers();
  toast(`View “${name}” saved — find it under Students → Views`);
};
applySavedView = function (i) {
  const v = savedViews[i];
  if (!v) return;
  applyStControls(v.state);
  stTable.render();
  document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("on"));
  toast(`View applied: ${v.name}`);
};
deleteSavedView = function (i) {
  const name = savedViews[i]?.name;
  savedViews.splice(i, 1);
  try { localStorage.setItem("pd-views", JSON.stringify(savedViews)); } catch {}
  renderViewList();
  toast(`View “${name}” deleted`, "info", "Undo");
};
renderViewList();

/* ---------- Advanced filter drawer ↔ Students table wiring ---------- */
const DF_DEPT_IDS = { "Computer Science": "df-dept-cs", "Information Tech": "df-dept-it", "Electronics": "df-dept-ec", "Electrical": "df-dept-ee", "Mechanical": "df-dept-me", "Civil": "df-dept-cv" };

function drawerSelections() {
  return {
    depts: Object.entries(DF_DEPT_IDS).filter(([, id]) => document.getElementById(id)?.checked).map(([d]) => d),
    cgpaMin: document.getElementById("df-cgpa-min")?.value || "",
    cgpaMax: document.getElementById("df-cgpa-max")?.value || "",
    backlogs: document.getElementById("df-backlogs")?.value || "any",
    status: document.querySelector('input[name="df-status"]:checked')?.value || "all",
    verified: !!document.getElementById("df-verified")?.checked,
    dream: !!document.getElementById("df-dream")?.checked,
  };
}
applyDrawerFilters = function () {
  const d = drawerSelections();
  stTable.q.depts = d.depts.length ? d.depts : null;
  stTable.q.minCgpa = d.cgpaMin === "" ? 0 : +d.cgpaMin; /* empty field clears the filter */
  stTable.q.cgpaMax = d.cgpaMax === "" ? null : +d.cgpaMax;
  stTable.q.backlogs = d.backlogs;
  stTable.q.status = d.status;
  stTable.q.verifiedOnly = d.verified;
  stTable.q.dreamOnly = d.dream;
  setVal("st-cgpa", String(stTable.q.minCgpa)); /* keep inline CGPA select in sync */
  syncStChips();
  stTable.set({}); /* re-render with new filters */
  closeDrawers();
  const total = stTable.viewRows().length;
  toast(`Filters applied — ${total} matching student${total === 1 ? "" : "s"}`);
};
resetDrawerControls = function () {
  Object.values(DF_DEPT_IDS).forEach(id => { const c = document.getElementById(id); if (c) c.checked = false; });
  setVal("df-cgpa-min", ""); setVal("df-cgpa-max", ""); setVal("df-backlogs", "any");
  const any = document.querySelector('input[name="df-status"][value="all"]');
  if (any) any.checked = true;
  const v = document.getElementById("df-verified"); if (v) v.checked = false;
  const dr = document.getElementById("df-dream"); if (dr) dr.checked = false;
};
resetDrawerFilters = function () {
  resetDrawerControls();
  stTable.q.depts = null; stTable.q.cgpaMax = null; stTable.q.backlogs = "any"; stTable.q.verifiedOnly = false; stTable.q.dreamOnly = false;
  if (stTable.q.status !== "all") { stTable.q.status = "all"; syncStChips(); }
  stTable.render();
  toast("Advanced filters reset", "info");
};
syncDrawerControls = function () {
  /* reflect live query state back into the drawer (e.g. after a saved view is applied) */
  Object.entries(DF_DEPT_IDS).forEach(([dept, id]) => {
    const c = document.getElementById(id);
    if (c) c.checked = !!(stTable.q.depts && stTable.q.depts.includes(dept));
  });
  setVal("df-cgpa-min", stTable.q.minCgpa ? String(stTable.q.minCgpa) : "");
  setVal("df-cgpa-max", stTable.q.cgpaMax != null ? String(stTable.q.cgpaMax) : "");
  setVal("df-backlogs", stTable.q.backlogs || "any");
  const radio = document.querySelector(`input[name="df-status"][value="${stTable.q.status || "all"}"]`);
  if (radio) radio.checked = true;
  const v = document.getElementById("df-verified"); if (v) v.checked = !!stTable.q.verifiedOnly;
  const dr2 = document.getElementById("df-dream"); if (dr2) dr2.checked = !!stTable.q.dreamOnly;
};

/* table state demo: data / loading skeleton / empty / error */
tableState = function (mode, btn) {
  document.querySelectorAll("#table-state-demo button").forEach(b => b.classList.remove("on"));
  if (btn) btn.classList.add("on");
  const show = (id, on) => { const el = document.getElementById(id); if (el) el.style.display = on ? "" : "none"; };
  if (mode === "data") {
    show("students-skeleton", false); show("students-empty", false); show("students-error", false);
    stTable.render(); /* restores wrap / pagination / noresults based on the live query */
  } else {
    show("students-table-wrap", false); show("students-pagination", false); show("students-noresults", false);
    show("students-skeleton", mode === "loading");
    show("students-empty", mode === "empty");
    show("students-error", mode === "error");
  }
};

/* ---------- Employers: second live instance of the same pattern ---------- */
const empTable = queryTable({
  global: "empTable",
  scope: "#screen-employers",
  data: EMPLOYERS,
  perPage: 6,
  extraState: { industry: "", status: "all" },
  ids: {
    tbody: "emp-tbody", count: "emp-count",
    pgInfo: "emp-pg-info", pgButtons: "emp-pg-buttons", pagination: "emp-pagination",
    noresults: "emp-noresults", wrap: "emp-table-wrap",
  },
  sortAttr: "data-emp-key",
  sort: { name: s => s.name, drives: s => s.drives },
  match(s, q) {
    const needle = q.q.trim().toLowerCase();
    if (needle && !(s.name.toLowerCase().includes(needle) || s.industry.toLowerCase().includes(needle))) return false;
    if (q.industry && s.industry !== q.industry) return false;
    if (q.status !== "all" && s.status !== q.status) return false;
    return true;
  },
  row(s) {
    const sel = selectedEmployers.has(s.id);
    return `
    <tr data-id="${s.id}">
      <td style="width:36px"><input type="checkbox" style="width:16px;height:16px;accent-color:#1c1c21" aria-label="Select ${s.name}" ${sel ? "checked" : ""} onchange="toggleEmpRow(${s.id}, this.checked)"></td>
      <td>
        <div class="cell-main">
          <span class="avatar"></span>
          <div><a class="rowlink" href="#/employers" onclick="event.preventDefault();toast('Employer profile — reuses the Record Detail pattern (see a student row)')">${s.name}</a><small>${s.drives} drives · ${s.hires} hires this season</small></div>
        </div>
      </td>
      <td>${s.industry}</td>
      <td class="num">${s.drives || "—"}</td>
      <td class="num">${s.hires || "—"}</td>
      <td>${EMP_REL_BADGE[s.rel]}</td>
      <td>${EMP_STATUS_BADGE[s.status]}</td>      <td style="width:44px">
        <span class="dd-wrap">
          <button class="kebab" onclick="toggleDD('dd-emp-${s.id}',this)" aria-label="Row actions for ${s.name}" aria-haspopup="true" aria-expanded="false">${icon("dots")}</button>
          <span class="dropdown narrow" id="dd-emp-${s.id}" role="menu">
            <button class="dd-item" onclick="toast('Employer profile — reuses the Record Detail pattern')">View profile</button>
            <button class="dd-item" onclick="toast('Edit employer — reuses the Form pattern')">Edit</button>
            <button class="dd-item" onclick="toast('Relationship timeline opens')">Activity</button>
            <div class="dd-sep"></div>
            <button class="dd-item" style="color:var(--bad-ink)" onclick="pendingArchive={table:empTable,ids:[${s.id}],noun:'employer'};openModal('modal-confirm-archive')">Archive</button>
          </span>
        </span>
      </td>
    </tr>`;
  },
  chipCounts() {
    const c = { all: EMPLOYERS.length, active: 0, dormant: 0, pending: 0 };
    EMPLOYERS.forEach(s => { if (c[s.status] !== undefined) c[s.status]++; });
    document.querySelectorAll("#screen-employers [data-emp-status]").forEach(ch => {
      const n = ch.querySelector(".n");
      if (n) n.textContent = c[ch.dataset.empStatus];
    });
  },
  clearControls() {
    setVal("emp-search", ""); setVal("emp-industry", "");
    document.querySelectorAll("#screen-employers [data-emp-status]").forEach(c =>
      c.classList.toggle("on", c.dataset.empStatus === "all"));
  },
  afterRender() { syncEmpBulk(); syncEmpCheckAll(); },
});
window.empTable = empTable;
clearEmpQuery = function () { empTable.clear(); };

/* employer row selection + shared bulk bar (VIS-102) */
const selectedEmployers = new Set();
toggleEmpRow = function (id, on) {
  on ? selectedEmployers.add(id) : selectedEmployers.delete(id);
  syncEmpBulk(); syncEmpCheckAll();
};
toggleEmpSelectAll = function (master) {
  empTable.currentRows().forEach(s => master.checked ? selectedEmployers.add(s.id) : selectedEmployers.delete(s.id));
  empTable.render();
};
clearEmpSelection = function () { selectedEmployers.clear(); empTable.render(); };
empPerPage = function (n) { empTable.perPage(n); };
syncEmpBulk = function () {
  const n = selectedEmployers.size;
  setText("emp-bulk-count", n);
  const bar = document.getElementById("emp-bulk-bar");
  if (!bar) return;
  bar.classList.toggle("idle", n === 0);
  bar.classList.toggle("on", n > 0);
  ["eb-msg", "eb-exp", "eb-drive", "eb-arch", "eb-clear"].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.disabled = n === 0;
  });
};
syncEmpCheckAll = function () {
  const all = document.getElementById("emp-check-all");
  if (!all) return;
  const ids = empTable.currentRows().map(s => s.id);
  const sel = ids.filter(id => selectedEmployers.has(id)).length;
  all.checked = ids.length > 0 && sel === ids.length;
  all.indeterminate = sel > 0 && sel < ids.length;
};

(function wireEmployers() {
  document.getElementById("emp-search")?.addEventListener("input", e => empTable.set({ q: e.target.value }));
  document.getElementById("emp-industry")?.addEventListener("change", e => empTable.set({ industry: e.target.value }));
  document.querySelectorAll("#screen-employers .chip-row[data-chip-group]")[0]?.addEventListener("click", e => {
    const chip = e.target.closest("[data-emp-status]");
    if (chip) empTable.set({ status: chip.dataset.empStatus });
  });
  document.querySelectorAll("#screen-employers .th-sort[data-emp-key]").forEach(b =>
    b.addEventListener("click", () => empTable.sort(b.getAttribute("data-emp-key"))));
})();

/* Employers becomes a real module, not a placeholder */
ROUTES["/employers"] = { screen: "screen-employers", nav: "employers" };

/* ---------- Offers: third live instance of the table engine ---------- */
const OFFERS = [
  { id: 1,  student: "Priya Nair",     reg: "EC21-0871", role: "Risk Analyst",        employer: "FinEdge",     ctc: 9.5,  offered: "2026-09-30", status: "accepted" },
  { id: 2,  student: "Aarav Sharma",   reg: "CS21-1042", role: "Data Analyst",        employer: "TechNova",    ctc: 11,   offered: "2026-09-28", status: "accepted" },
  { id: 3,  student: "Meera Joshi",    reg: "IT21-0955", role: "Backend Developer",   employer: "OrbitPay",    ctc: 12,   offered: "2026-09-27", status: "pending"  },
  { id: 4,  student: "Sneha Kulkarni", reg: "CS21-1108", role: "Software Engineer",   employer: "Acme Corp",   ctc: 9,    offered: "2026-09-25", status: "declined" },
  { id: 5,  student: "Ananya Iyer",    reg: "IT21-0920", role: "ML Engineer",         employer: "AutoEdge",    ctc: 14,   offered: "2026-09-24", status: "accepted" },
  { id: 6,  student: "Aditya Rao",     reg: "CS21-1130", role: "Platform Engineer",   employer: "GreenGrid",   ctc: 10.5, offered: "2026-09-22", status: "pending"  },
  { id: 7,  student: "Divya Menon",    reg: "CS21-1177", role: "QA Engineer",         employer: "TechNova",    ctc: 7.5,  offered: "2026-09-20", status: "accepted" },
  { id: 8,  student: "Rohan Mehta",    reg: "ME21-0654", role: "Design Engineer",     employer: "CoreMotive",  ctc: 8,    offered: "2026-09-18", status: "pending"  },
  { id: 9,  student: "Nisha Patel",    reg: "CV21-0471", role: "Site Analyst",        employer: "BuildWorks",  ctc: 6.5,  offered: "2026-09-16", status: "accepted" },
  { id: 10, student: "Arjun Desai",    reg: "ME21-0701", role: "Thermal Engineer",    employer: "GreenGrid",   ctc: 8.5,  offered: "2026-09-14", status: "declined" },
  { id: 11, student: "Riya Kapoor",    reg: "CS21-1201", role: "Security Analyst",    employer: "FinEdge",     ctc: 10,   offered: "2026-09-12", status: "accepted" },
  { id: 12, student: "Karan Malhotra", reg: "EE21-0512", role: "Embedded Engineer",   employer: "AutoEdge",    ctc: 7,    offered: "2026-09-10", status: "pending"  },
  { id: 13, student: "Tanvi Deshmukh", reg: "EC21-0904", role: "Signal Engineer",     employer: "TechNova",    ctc: 9,    offered: "2026-09-08", status: "accepted" },
  { id: 14, student: "Ishaan Verma",   reg: "EE21-0530", role: "Power Systems Eng.",  employer: "VoltEdge",    ctc: 7.8,  offered: "2026-09-06", status: "pending"  },
];
const OFFER_STATUS_BADGE = {
  accepted: '<span class="badge ok">Accepted</span>',
  pending:  '<span class="badge warn">Pending response</span>',
  declined: '<span class="badge bad">Declined</span>',
};
const offerTable = queryTable({
  global: "offerTable",
  scope: "#screen-offers",
  data: OFFERS,
  perPage: 10,
  extraState: { status: "" },
  ids: {
    tbody: "offers-tbody", count: "of-count",
    pgInfo: "of-pg-info", pgButtons: "of-pg-buttons", pagination: "offers-pagination",
    noresults: "offers-noresults", wrap: "offers-table-wrap",
  },
  sortAttr: "data-of-key",
  sort: { student: s => s.student, ctc: s => s.ctc, offered: s => s.offered },
  match(s, q) {
    const needle = q.q.trim().toLowerCase();
    if (needle && !(s.student.toLowerCase().includes(needle) || s.employer.toLowerCase().includes(needle) || s.role.toLowerCase().includes(needle))) return false;
    if (q.status && s.status !== q.status) return false;
    return true;
  },
  row(s) {
    return `
    <tr data-id="${s.id}">
      <td><div class="cell-main"><span class="avatar"></span><div><b>${s.student}</b><small>${s.reg}</small></div></div></td>
      <td>${s.role} · ${s.employer}</td>
      <td class="num">₹${s.ctc} LPA</td>
      <td>${new Date(s.offered).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
      <td>${OFFER_STATUS_BADGE[s.status]}</td>
      <td style="width:44px">
        <span class="dd-wrap">
          <button class="kebab" onclick="toggleDD('dd-of-${s.id}',this)" aria-label="Row actions for ${s.student}'s offer" aria-haspopup="true" aria-expanded="false">${icon("dots")}</button>
          <span class="dropdown narrow" id="dd-of-${s.id}" role="menu">
            <button class="dd-item" onclick="toast('Offer letter — reuses the Document Preview pattern')">View offer letter</button>
            <button class="dd-item" onclick="toast('Reminder sent to ${s.student}')">Send reminder</button>
            <button class="dd-item" onclick="toast('Student record — reuses the Record Detail pattern')">Open student record</button>
            <div class="dd-sep"></div>
            <button class="dd-item" style="color:var(--bad-ink)" onclick="toast('Revoke requires TPO approval — see approval-chain note in Offers')">Revoke offer…</button>
          </span>
        </span>
      </td>
    </tr>`;
  },
  chipCounts() {
    const c = { all: OFFERS.length, accepted: 0, pending: 0, declined: 0 };
    OFFERS.forEach(s => c[s.status]++);
    document.querySelectorAll("#screen-offers [data-offer-status]").forEach(ch => {
      const n = ch.querySelector(".n");
      if (n) n.textContent = c[ch.dataset.offerStatus];
    });
  },
  clearControls() {
    setVal("of-search", ""); setVal("of-status", "");
    document.querySelectorAll("#screen-offers [data-offer-status]").forEach(c =>
      c.classList.toggle("on", c.dataset.offerStatus === "all"));
  },
});
clearOfferQuery = function () { offerTable.clear(); };
offerPerPage = function (n) { offerTable.perPage(n); };

(function wireOffers() {
  document.getElementById("of-search")?.addEventListener("input", e => offerTable.set({ q: e.target.value }));
  document.getElementById("of-status")?.addEventListener("change", e => offerTable.set({ status: e.target.value }));
  document.querySelector("#screen-offers .chip-row[data-chip-group]")?.addEventListener("click", e => {
    const chip = e.target.closest("[data-offer-status]");
    if (chip) offerTable.set({ status: chip.dataset.offerStatus === "all" ? "" : chip.dataset.offerStatus });
  });
  document.querySelectorAll("#screen-offers .th-sort[data-of-key]").forEach(b =>
    b.addEventListener("click", () => offerTable.sort(b.getAttribute("data-of-key"))));
})();

/* ---------- Pending invites: resend / revoke (works on any invite row) ---------- */
inviteAction = function (action, row) {
  const email = row?.querySelector(".cell-main small")?.textContent || "the invitee";
  if (action === "resend") {
    toast(`Invite resent to ${email}`, "success");
  } else if (action === "revoke") {
    if (row) {
      const badge = row.querySelector(".badge.warn");
      const menu = row.querySelector(".dd-wrap");
      const snapshot = badge ? { cls: badge.className, text: badge.textContent } : null;
      if (badge) { badge.className = "badge neutral"; badge.textContent = "Invite revoked"; }
      row.style.opacity = ".55";
      menu?.remove();
      toast(`Invite to ${email} revoked`, "warning", "Undo", () => {
        if (badge && snapshot) { badge.className = snapshot.cls; badge.textContent = snapshot.text; }
        row.style.opacity = "";
        row.querySelector("td:last-child").innerHTML = `
          <span class="dd-wrap">
            <button class="kebab" onclick="toggleDD('dd-invite-farah',this)" aria-label="Actions for pending invite" aria-haspopup="true" aria-expanded="false"><span class="ic"><svg><use href="#i-dots"/></svg></span></button>
            <span class="dropdown narrow" id="dd-invite-farah" role="menu">
              <button class="dd-item" onclick="toggleDD('dd-invite-farah');inviteAction('resend', this.closest('tr'))"><div><b>Resend invite</b><small>Link valid for 7 more days</small></div></button>
              <button class="dd-item" onclick="toggleDD('dd-invite-farah');toast('Invite link copied','info')"><div><b>Copy invite link</b></div></button>
              <div class="dd-sep"></div>
              <button class="dd-item" style="color:var(--bad-ink)" onclick="toggleDD('dd-invite-farah');inviteAction('revoke', this.closest('tr'))">Revoke invite</button>
            </span>
          </span>`;
        toast(`Invite to ${email} restored`);
      });
    }
  }
};

/* ---------- Dialog focus management (modals, drawers, mobile search) ---------- */
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
const modalStack = [];

const _openModalV2 = openModal, _closeModalV2 = closeModal;
openModal = function (id) {
  const m = document.getElementById(id);
  if (!m) return;
  /* prune entries whose veil was closed via backdrop click */
  for (let i = modalStack.length - 1; i >= 0; i--) {
    if (!document.getElementById(modalStack[i].id)?.classList.contains("on")) modalStack.splice(i, 1);
  }
  modalStack.push({ id, opener: document.activeElement });
  m.classList.add("on");
  const inner = m.querySelector(".modal") || m;
  const target = inner.querySelector("input,select,textarea") || inner.querySelector("button") || inner;
  if (target === inner && !inner.hasAttribute("tabindex")) inner.tabIndex = -1;
  setTimeout(() => target.focus(), 40);
};
closeModal = function (id) {
  _closeModalV2(id);
  const i = modalStack.findIndex(x => x.id === id);
  if (i > -1) {
    const [rec] = modalStack.splice(i, 1);
    if (!modalStack.length) rec.opener?.focus?.();
  }
};

/* Escape closes the topmost dialog and returns focus (capture phase, so it
   supersedes the older close-all listener) */
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  const ms = document.getElementById("mobile-search");
  if (ms?.classList.contains("on")) { ms.classList.remove("on"); document.querySelector(".mobile-search-btn")?.focus(); e.stopPropagation(); return; }
  if (modalStack.length) {
    const top = modalStack.pop();
    document.getElementById(top.id)?.classList.remove("on");
    if (!modalStack.length) top.opener?.focus?.();
    e.stopPropagation();
  }
}, true);

/* Focus trap: keep Tab inside the topmost dialog */
document.addEventListener("keydown", e => {
  if (e.key !== "Tab") return;
  let root = null;
  const veils = [...document.querySelectorAll(".modal-veil.on")];
  if (veils.length) root = veils[veils.length - 1].querySelector(".modal") || veils[veils.length - 1];
  else if (document.querySelector(".drawer.on")) root = document.querySelector(".drawer.on");
  else if (document.getElementById("mobile-search")?.classList.contains("on")) root = document.getElementById("mobile-search");
  if (!root) return;
  const els = [...root.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length > 0);
  if (!els.length) return;
  const first = els[0], last = els[els.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* Backdrop-click closures also restore focus */
document.addEventListener("click", e => {
  if (e.target.classList?.contains("modal-veil") && !e.target.classList.contains("on") && modalStack.length) {
    const top = modalStack[modalStack.length - 1];
    if (top.id === e.target.id) { modalStack.pop(); if (!modalStack.length) top.opener?.focus?.(); }
  }
});

/* Drawers: focus in on open, restore on close */
const _openDrawerV2 = openDrawer, _closeDrawersV2 = closeDrawers;
let drawerOpener = null;
openDrawer = function (id) {
  drawerOpener = document.activeElement;
  _openDrawerV2(id);
  const d = document.getElementById(id);
  setTimeout(() => { (d?.querySelector(FOCUSABLE) || d)?.focus?.(); }, 40);
};
closeDrawers = function () {
  _closeDrawersV2();
  drawerOpener?.focus?.();
  drawerOpener = null;
};

/* ---------- Dropdowns: keep aria-expanded truthful ---------- */
const _toggleDDV2 = toggleDD;
toggleDD = function (id, btn) {
  _toggleDDV2(id);
  const on = document.getElementById(id)?.classList.contains("on");
  document.querySelectorAll("[aria-haspopup]").forEach(b => b.setAttribute("aria-expanded", "false"));
  if (btn && on) btn.setAttribute("aria-expanded", "true");
};
document.addEventListener("click", e => {
  if (!e.target.closest(".dd-wrap")) {
    document.querySelectorAll("[aria-haspopup]").forEach(b => b.setAttribute("aria-expanded", "false"));
  }
});

/* ---------- Router a11y: document title, aria-current, focus destination ---------- */
const _routeV2 = route;
route = function () {
  _routeV2();
  const hash = location.hash.replace("#", "") || "/dashboard";
  document.querySelectorAll(".nav a[data-nav]").forEach(a => {
    if (a.classList.contains("active")) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  const scope = hash.startsWith("/auth/")
    ? [...document.querySelectorAll(".auth-screen")].find(s => s.style.display === "block")
    : document.querySelector(".screen.on");
  const h1 = scope?.querySelector("h1");
  document.title = (h1 ? h1.textContent.trim() : "PlaceDesk") + " — PlaceDesk";
  if (h1) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); }
};

/* ---------- Toasts: live region, close button, pause on hover ---------- */
toast = function (msg, type = "success", undoLabel = null, undoFn = null) {
  const box = document.querySelector(".toasts");
  box.setAttribute("aria-live", "polite");
  const t = document.createElement("div");
  t.className = "toast" + (type !== "success" ? " " + type : "");
  t.setAttribute("role", type === "error" ? "alert" : "status");
  const ic = type === "error" ? "x" : type === "warning" ? "bell" : type === "info" ? "help" : "check";
  t.innerHTML = icon(ic) + `<span>${msg}</span>`
    + (undoLabel ? `<button class="undo">${undoLabel}</button>` : "")
    + `<button class="t-close" aria-label="Dismiss notification">×</button>`;
  box.appendChild(t);
  let timer;
  const dismiss = () => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(() => t.remove(), 320); };
  const start = ms => { clearTimeout(timer); timer = setTimeout(dismiss, ms); };
  t.querySelector(".t-close").onclick = () => { clearTimeout(timer); dismiss(); };
  const undoBtn = t.querySelector(".undo");
  if (undoBtn) undoBtn.onclick = () => {
    clearTimeout(timer);
    if (undoFn) undoFn(); /* real undo; without one this is just a label */
    dismiss();
  };
  t.addEventListener("mouseenter", () => clearTimeout(timer));
  t.addEventListener("mouseleave", () => start(1600));
  start(3800);
};

/* ---------- Deferred-commit archive with real Undo ---------- */
function archiveRows(table, ids, noun) {
  const rows = table.cfgData().filter(r => ids.includes(r.id));
  if (!rows.length) return;
  ids.forEach(id => table.removeRow(id));
  if (typeof selectedRows !== "undefined") ids.forEach(id => selectedRows.delete(id));
  if (typeof selectedEmployers !== "undefined") ids.forEach(id => selectedEmployers.delete(id));
  let undone = false;
  let timer;
  toast(`${rows.length} ${noun}${rows.length > 1 ? "s" : ""} archived`, "warning", "Undo", () => {
    undone = true;
    clearTimeout(timer);
    table.restoreRows(rows);
    toast(`${rows.length} ${noun}${rows.length > 1 ? "s" : ""} restored`);
  });
  timer = setTimeout(() => { if (!undone) { /* commit point: row stays archived */ } }, 3900);
}
archiveSelectedStudents = function () {
  closeModal("modal-confirm-bulk");
  const ids = [...selectedRows];
  archiveRows(stTable, ids, "student");
  selectedRows.clear(); stTable.render();
};
archiveOneStudent = function (id) {
  closeModal("modal-confirm-archive");
  archiveRows(stTable, [id], "student");
};
archiveOneEmployer = function (id) {
  closeModal("modal-confirm-archive");
  archiveRows(empTable, [id], "employer");
};
/* generic confirm modal commits whatever pendingArchive context was set by the opener */
let pendingArchive = null;
confirmPendingArchive = function () {
  closeModal("modal-confirm-archive");
  const ctx = pendingArchive;
  pendingArchive = null;
  if (!ctx) { toast("Action completed", "warning"); return; }
  if (ctx.table) { /* table-backed archive (students / employers) */
    archiveRows(ctx.table, ctx.ids, ctx.noun);
  } else if (ctx.row) { /* DOM-row removal with undo (documents, API keys) */
    const row = ctx.row, parent = row.parentNode, next = row.nextSibling;
    row.remove();
    toast(`${ctx.noun.charAt(0).toUpperCase() + ctx.noun.slice(1)} deleted`, "warning", "Undo", () => {
      parent.insertBefore(row, next);
      toast(`${ctx.noun.charAt(0).toUpperCase() + ctx.noun.slice(1)} restored`);
    });
  } else { /* no concrete target (e.g. file inside preview modal) — honest, undoable-looking */
    toast(`${ctx.noun.charAt(0).toUpperCase() + ctx.noun.slice(1)} deleted`, "warning", "Undo");
  }
};

/* ---------- Job form: validate every required field, alert summary ---------- */
validateJobForm = function (e) {
  e.preventDefault();
  const req = [
    ["jf-title", "Job title is required"],
    ["jf-desc", "Description is required"],
    ["jf-deadline", "Deadline is required"],
  ];
  const bad = [];
  req.forEach(([id, msg]) => {
    const input = document.getElementById(id);
    const field = input.closest(".field");
    const isBad = !input.value.trim();
    field.classList.toggle("error", isBad);
    if (isBad) bad.push({ input, msg });
  });
  const summary = document.getElementById("jf-error-summary");
  if (bad.length) {
    summary.style.display = "flex";
    summary.setAttribute("role", "alert");
    summary.querySelector("div").innerHTML =
      `<b>${bad.length} field${bad.length > 1 ? "s" : ""} need${bad.length > 1 ? "" : "s"} attention before publishing</b>${bad.map(b => b.msg).join(" · ")}`;
    toast("Please fix the highlighted fields", "error");
    bad[0].input.scrollIntoView({ behavior: "smooth", block: "center" });
    bad[0].input.focus({ preventScroll: true });
    return;
  }
  summary.style.display = "none";
  const btn = document.getElementById("jf-publish");
  btn.classList.add("loading");
  btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove("loading"); btn.disabled = false;
    jobFormDirty = false;
    document.getElementById("job-form-wrap").style.display = "none";
    document.getElementById("job-success").style.display = "";
    window.scrollTo(0, 0);
  }, 900);
};

/* ---------- Mobile search overlay: live results from the same index ---------- */
document.getElementById("ms-input")?.addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  const box = document.getElementById("ms-results");
  if (q.length < 2) {
    box.innerHTML = `<p style="padding:14px;color:var(--ink-3);font-size:13px;margin:0">Type at least 2 characters…</p>`;
    return;
  }
  let html = "", hits = 0;
  SEARCH_INDEX.forEach(g => {
    const items = g.items.filter(i => i[0].toLowerCase().includes(q) || i[1].toLowerCase().includes(q));
    if (!items.length) return;
    html += `<div class="sr-group">${g.group}</div>`;
    items.forEach(i => {
      hits++;
      html += `<button class="sr-item" onclick="location.hash='${i[2]}';document.getElementById('mobile-search').classList.remove('on')"><b>${i[0]}</b><small>${i[1]}</small></button>`;
    });
  });
  if (!hits) html = `<p style="padding:14px;color:var(--ink-3);font-size:13px;margin:0">No matches for “${q}”.</p>`;
  box.innerHTML = html;
});

/* ---------- Drives: loading skeleton state ---------- */
(function addDrivesSkeleton() {
  const wrap = document.getElementById("drives-grid-wrap");
  if (!wrap) return;
  const card = `<div class="card" style="padding:16px">
    <div class="skel" style="height:88px;margin-bottom:14px"></div>
    <div class="skel" style="height:14px;width:58%;margin-bottom:10px"></div>
    <div class="skel" style="height:11px;width:82%;margin-bottom:16px"></div>
    <div class="skel" style="height:10px;width:44%"></div>
  </div>`;
  wrap.insertAdjacentHTML("afterend",
    `<div id="drives-skeleton" style="display:none" aria-hidden="true"><div class="grid cols-3">${card}${card}${card}</div></div>`);
})();
drivesState = function (mode, btn) {
  document.querySelectorAll("#drives-state-demo button").forEach(b => b.classList.remove("on"));
  if (btn) btn.classList.add("on");
  document.getElementById("drives-grid-wrap").style.display = mode === "data" ? "" : "none";
  document.getElementById("drives-skeleton").style.display = mode === "loading" ? "" : "none";
  document.getElementById("drives-noresults").style.display = mode === "noresults" ? "" : "none";
  document.getElementById("drives-loadmore").style.display = mode === "data" ? "" : "none";
};

/* ---------- Platform-aware shortcut hint (CV-001) ---------- */
(function () {
  const mac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || "");
  document.querySelectorAll(".topbar .search kbd").forEach(k => { k.textContent = mac ? "\u2318K" : "Ctrl K"; });
})();

/* ---------- v3 boot ---------- */
window.removeEventListener("hashchange", _routeV2);
window.addEventListener("hashchange", route);
stTable.render();
empTable.render();
offerTable.render();
route();
