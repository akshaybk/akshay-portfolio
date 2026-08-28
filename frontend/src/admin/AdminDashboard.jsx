import { useEffect, useState } from "react";
import {
  adminRequest,
  getEducation,
  getExperience,
  getProjects,
  getProfile,
  getSiteSettings,
  getSkills,
  getSocialLinks,
} from "../services/api";

const sections = [
  "Overview",
  "Profile",
  "Projects",
  "Skills",
  "Experience",
  "Education",
  "Social Links",
  "Site Settings",
];

const empty = {
  projects: { title: "", slug: "", short_description: "", description: "", image_url: "", github_url: "", live_url: "", technologies: "", featured: false, display_order: 0 },
  skills: { name: "", category: "", icon: "", proficiency: 0, display_order: 0 },
  experience: { company: "", role: "", location: "", start_date: "", end_date: "", current: false, description: "", technologies: "", display_order: 0 },
  education: { institution: "", degree: "", field: "", location: "", start_date: "", end_date: "", description: "", display_order: 0 },
  social: { platform: "", url: "", icon: "", display_order: 0 },
  settings: { site_title: "", site_description: "", accent_color: "#7c3aed", github_username: "", linkedin_url: "", contact_email: "" },
  profile: { name: "", headline: "", bio: "", email: "", phone: "", location: "", profile_image_url: "", resume_url: "", availability: "", github_url: "", linkedin_url: "", website_url: "" },
};

const configs = {
  Projects: { key: "projects", endpoint: "projects", singular: "project", fields: ["title", "slug", "short_description", "description", "image_url", "github_url", "live_url", "technologies", "featured", "display_order"], columns: ["title", "slug", "featured", "display_order"] },
  Skills: { key: "skills", endpoint: "skills", singular: "skill", fields: ["name", "category", "icon", "proficiency", "display_order"], columns: ["name", "category", "proficiency", "display_order"] },
  Experience: { key: "experience", endpoint: "experience", singular: "experience", fields: ["company", "role", "location", "start_date", "end_date", "current", "description", "technologies", "display_order"], columns: ["role", "company", "start_date", "end_date"] },
  Education: { key: "education", endpoint: "education", singular: "education", fields: ["institution", "degree", "field", "location", "start_date", "end_date", "description", "display_order"], columns: ["degree", "institution", "start_date", "end_date"] },
  "Social Links": { key: "social", endpoint: "social-links", singular: "social link", fields: ["platform", "url", "icon", "display_order"], columns: ["platform", "url", "icon", "display_order"] },
};

function AdminDashboard({ onLogout }) {
  const [active, setActive] = useState("Overview");
  const [data, setData] = useState({ profile: null, projects: [], skills: [], experience: [], education: [], social: [], settings: null });
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      const [profile, projects, skills, experience, education, social, settings] = await Promise.all([
        getProfile(),
        getProjects(),
        getSkills(),
        getExperience(),
        getEducation(),
        getSocialLinks(),
        getSiteSettings(),
      ]);
      setData({
        profile: Array.isArray(profile) ? profile[0] || null : profile || null,
        projects: projects || [],
        skills: skills || [],
        experience: experience || [],
        education: education || [],
        social: social || [],
        settings: Array.isArray(settings) ? settings[0] || null : settings || null,
      });
    } catch (error) {
      setMessage(error.message || "Could not load portfolio data.");
    }
  };

  useEffect(() => { loadData(); }, []);

  const logout = () => {
    localStorage.removeItem("portfolio_admin_token");
    onLogout();
  };

  const counts = {
    Profile: data.profile ? 1 : 0,
    Projects: data.projects.length,
    Skills: data.skills.length,
    Experience: data.experience.length,
    Education: data.education.length,
    "Social Links": data.social.length,
    "Site Settings": data.settings ? 1 : 0,
  };

  let content;
  if (active === "Overview") content = <Overview counts={counts} onSelect={setActive} />;
  else if (active === "Profile") content = <ProfileEditor value={data.profile} onSaved={loadData} />;
  else if (active === "Site Settings") content = <SiteSettingsEditor value={data.settings} onSaved={loadData} />;
  else {
    const config = configs[active];
    content = <ResourceEditor config={config} items={data[config.key]} onChanged={loadData} />;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-brand">AKSHAY<span>.</span></div>
          <p className="admin-sidebar-label">Management</p>
          <nav>
            {sections.map((section) => (
              <button key={section} className={active === section ? "active" : ""} onClick={() => { setActive(section); setMessage(""); }}>
                {section}
              </button>
            ))}
          </nav>
        </div>
        <button className="admin-logout" onClick={logout}>Sign out</button>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <div><p className="admin-eyebrow">Admin Dashboard</p><h1>{active}</h1></div>
          <a href="/" className="admin-view-site">View portfolio ↗</a>
        </header>
        {message && <div className="admin-notice">{message}</div>}
        {content}
      </main>
    </div>
  );
}

function Overview({ counts, onSelect }) {
  return (
    <>
      <div className="admin-welcome">
        <p className="admin-eyebrow">Control center</p>
        <h2>Keep your portfolio current.</h2>
        <p>Manage the content powering your public portfolio from one place.</p>
      </div>
      <div className="admin-stats">
        {sections.slice(1).map((section) => (
          <button key={section} onClick={() => onSelect(section)} className="admin-stat-card">
            <span>{section}</span><strong>{counts[section]}</strong><small>Manage →</small>
          </button>
        ))}
      </div>
    </>
  );
}

function ProfileEditor({ value, onSaved }) {
  const [form, setForm] = useState({ ...empty.profile, ...(value || {}) });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => setForm({ ...empty.profile, ...(value || {}) }), [value]);
  const update = (key, val) => setForm((current) => ({ ...current, [key]: val }));
  const fields = ["name", "headline", "email", "phone", "location", "availability", "profile_image_url", "resume_url", "github_url", "linkedin_url", "website_url"];
  const save = async (event) => {
    event.preventDefault(); setSaving(true); setStatus("");
    try {
      const result = await adminRequest("/profile", { method: "PUT", body: JSON.stringify(form) });
      onSaved(); setStatus("Profile saved successfully.");
      if (result) setForm((current) => ({ ...current, ...(Array.isArray(result) ? result[0] : result) }));
    } catch (error) { setStatus(error.message || "Failed to save profile."); }
    finally { setSaving(false); }
  };
  return (
    <form className="admin-editor" onSubmit={save}>
      <div className="admin-form-grid">
        {fields.map((key) => <label key={key}>{labelFor(key)}<input type={key === "email" ? "email" : "text"} value={form[key] || ""} onChange={(e) => update(key, e.target.value)} required={key === "name"} /></label>)}
      </div>
      <label>Bio<textarea rows="7" value={form.bio || ""} onChange={(e) => update("bio", e.target.value)} /></label>
      <SaveStatus status={status} saving={saving} text="Save changes" />
    </form>
  );
}

function SiteSettingsEditor({ value, onSaved }) {
  const [form, setForm] = useState({ ...empty.settings, ...(value || {}) });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => setForm({ ...empty.settings, ...(value || {}) }), [value]);
  const update = (key, val) => setForm((current) => ({ ...current, [key]: val }));
  const save = async (event) => {
    event.preventDefault(); setSaving(true); setStatus("");
    try {
      const endpoint = form.id ? `/site-settings/${form.id}` : "/site-settings";
      const method = form.id ? "PUT" : "POST";
      await adminRequest(endpoint, { method, body: JSON.stringify(form) });
      await onSaved(); setStatus("Site settings saved successfully.");
    } catch (error) { setStatus(error.message || "Failed to save site settings."); }
    finally { setSaving(false); }
  };
  return (
    <form className="admin-editor" onSubmit={save}>
      <div className="admin-form-grid">
        <label>Site title<input value={form.site_title} onChange={(e) => update("site_title", e.target.value)} required /></label>
        <label>Accent color<input className="admin-color-input" type="color" value={form.accent_color || "#7c3aed"} onChange={(e) => update("accent_color", e.target.value)} /></label>
        <label>GitHub username<input value={form.github_username || ""} onChange={(e) => update("github_username", e.target.value)} /></label>
        <label>LinkedIn URL<input type="url" value={form.linkedin_url || ""} onChange={(e) => update("linkedin_url", e.target.value)} /></label>
        <label>Contact email<input type="email" value={form.contact_email || ""} onChange={(e) => update("contact_email", e.target.value)} /></label>
      </div>
      <label>Site description<textarea rows="6" value={form.site_description || ""} onChange={(e) => update("site_description", e.target.value)} /></label>
      <SaveStatus status={status} saving={saving} text="Save settings" />
    </form>
  );
}

function ResourceEditor({ config, items, onChanged }) {
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");

  const save = async (item) => {
    setStatus("");
    try {
      const payload = normalizePayload(config.key, item);
      const endpoint = item.id ? `/${config.endpoint}/${item.id}` : `/${config.endpoint}`;
      const method = item.id ? "PUT" : "POST";
      await adminRequest(endpoint, { method, body: JSON.stringify(payload) });
      setEditing(null);
      setStatus(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} ${item.id ? "updated" : "created"} successfully.`);
      await onChanged();
    } catch (error) { setStatus(error.message || `Failed to save ${config.singular}.`); }
  };

  const remove = async (item) => {
    if (!item.id || !window.confirm(`Delete “${displayName(config.key, item)}”?`)) return;
    try {
      await adminRequest(`/${config.endpoint}/${item.id}`, { method: "DELETE" });
      setStatus(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} deleted successfully.`);
      await onChanged();
    } catch (error) { setStatus(error.message || `Failed to delete ${config.singular}.`); }
  };

  if (editing) return <DynamicForm config={config} initial={editing} onCancel={() => setEditing(null)} onSave={save} status={status} />;

  return (
    <section>
      <div className="admin-section-toolbar">
        <p className="admin-muted">{items.length} {config.singular}{items.length === 1 ? "" : "s"}</p>
        <button type="button" className="admin-primary-button admin-add-button" onClick={() => setEditing(makeEmpty(config))}>+ Add {config.singular}</button>
      </div>
      {status && <div className={status.includes("successfully") ? "admin-success" : "admin-error"}>{status}</div>}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr>{config.columns.map((field) => <th key={field}>{labelFor(field)}</th>)}<th>Actions</th></tr></thead>
          <tbody>
            {items.length ? items.map((item) => <tr key={item.id}>{config.columns.map((field) => <td key={field}>{formatValue(item[field], field)}</td>)}<td><button type="button" onClick={() => setEditing(editValue(config, item))}>Edit</button><button type="button" className="admin-danger-button" onClick={() => remove(item)}>Delete</button></td></tr>) : <tr><td colSpan={config.columns.length + 1} className="admin-empty-row">No {config.singular}s yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DynamicForm({ config, initial, onCancel, onSave, status }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <form className="admin-editor" onSubmit={(event) => { event.preventDefault(); onSave(form); }}>
      <div className="admin-form-grid">
        {config.fields.map((field) => {
          if (field === "description") return null;
          if (field === "featured" || field === "current") return <label className="admin-checkbox" key={field}><input type="checkbox" checked={Boolean(form[field])} onChange={(e) => update(field, e.target.checked)} /> {labelFor(field)}</label>;
          const type = field.includes("date") ? "date" : field === "proficiency" || field === "display_order" ? "number" : field === "url" || field.endsWith("_url") ? "url" : "text";
          return <label key={field}>{labelFor(field)}<input type={type} min={type === "number" ? "0" : undefined} max={field === "proficiency" ? "100" : undefined} value={form[field] ?? ""} onChange={(e) => update(field, e.target.value)} required={field === "name" || field === "title" || field === "slug" || field === "company" || field === "role" || field === "institution" || field === "degree" || field === "platform"} /></label>;
        })}
      </div>
      {config.fields.includes("description") && <label>Description<textarea rows="7" value={form.description || ""} onChange={(e) => update("description", e.target.value)} /></label>}
      {status && <div className="admin-error">{status}</div>}
      <div className="admin-editor-actions"><button type="button" className="admin-secondary-button" onClick={onCancel}>Cancel</button><button className="admin-primary-button admin-save-button">Save {config.singular}</button></div>
    </form>
  );
}

function SaveStatus({ status, saving, text }) {
  return <>{status && <div className={status.includes("successfully") ? "admin-success" : "admin-error"}>{status}</div>}<div className="admin-editor-actions"><button className="admin-primary-button admin-save-button" disabled={saving}>{saving ? "Saving..." : text}</button></div></>;
}

function makeEmpty(config) { return { ...empty[config.key] }; }
function editValue(config, item) { return { ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(", ") : item.technologies || "" }; }
function displayName(key, item) { return item.title || item.name || item.role || item.degree || item.platform || item.company || "this item"; }
function labelFor(key) { return key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()); }
function formatValue(value, field) { if (Array.isArray(value)) return value.join(", "); if (typeof value === "boolean") return value ? "Yes" : "No"; if (value === null || value === undefined || value === "") return "—"; return String(value); }
function normalizePayload(key, item) {
  const payload = { ...item };
  if ("display_order" in payload) payload.display_order = Number(payload.display_order) || 0;
  if ("proficiency" in payload) payload.proficiency = Number(payload.proficiency) || 0;
  if ("technologies" in payload && typeof payload.technologies === "string") payload.technologies = payload.technologies.split(",").map((value) => value.trim()).filter(Boolean);
  if ("current" in payload) payload.current = Boolean(payload.current);
  if ("featured" in payload) payload.featured = Boolean(payload.featured);
  return payload;
}

export default AdminDashboard;
