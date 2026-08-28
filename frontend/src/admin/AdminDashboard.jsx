import { useEffect, useState } from "react";
import { adminRequest, getEducation, getExperience, getProjects, getProfile, getSiteSettings, getSkills, getSocialLinks } from "../services/api";

const sections = ["Overview", "Profile", "Projects", "Skills", "Experience", "Education", "Social Links", "Site Settings"];
const emptyProject = { title: "", slug: "", short_description: "", description: "", image_url: "", github_url: "", live_url: "", technologies: "", featured: false, display_order: 0 };
const emptyProfile = { name: "", headline: "", bio: "", email: "", phone: "", location: "", profile_image_url: "", resume_url: "", availability: "", github_url: "", linkedin_url: "", website_url: "" };

function AdminDashboard({ onLogout }) {
  const [active, setActive] = useState("Overview");
  const [counts, setCounts] = useState({});
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  const loadData = async () => {
    try {
      const [profileData, projectData, skills, experience, education, socialLinks, settings] = await Promise.all([getProfile(), getProjects(), getSkills(), getExperience(), getEducation(), getSocialLinks(), getSiteSettings()]);
      setProfile(Array.isArray(profileData) ? profileData[0] || null : profileData || null);
      setProjects(projectData || []);
      setCounts({ Profile: profileData ? 1 : 0, Projects: projectData?.length || 0, Skills: skills?.length || 0, Experience: experience?.length || 0, Education: education?.length || 0, "Social Links": socialLinks?.length || 0, "Site Settings": settings ? 1 : 0 });
    } catch (err) { setMessage("Could not load portfolio data. Check that the API is running."); }
  };

  useEffect(() => { loadData(); }, []);

  return <div className="admin-shell">
    <aside className="admin-sidebar"><div><div className="admin-brand">AKSHAY<span>.</span></div><p className="admin-sidebar-label">Management</p><nav>{sections.map((section) => <button key={section} className={active === section ? "active" : ""} onClick={() => { setActive(section); setMessage(""); }}>{section}</button>)}</nav></div><button className="admin-logout" onClick={() => { localStorage.removeItem("portfolio_admin_token"); onLogout(); }}>Sign out</button></aside>
    <main className="admin-main"><header className="admin-header"><div><p className="admin-eyebrow">Admin Dashboard</p><h1>{active}</h1></div><a href="/" className="admin-view-site">View portfolio ↗</a></header>{message && <div className="admin-notice">{message}</div>}
      {active === "Overview" ? <Overview counts={counts} onSelect={setActive} /> : active === "Profile" ? <ProfileEditor profile={profile} onSaved={(saved) => { setProfile(saved); setCounts((c) => ({ ...c, Profile: 1 })); }} /> : active === "Projects" ? <ProjectsEditor projects={projects} onChanged={loadData} /> : <ResourcePanel section={active} />}
    </main>
  </div>;
}

function Overview({ counts, onSelect }) { return <><div className="admin-welcome"><p className="admin-eyebrow">Control center</p><h2>Keep your portfolio current.</h2><p>Manage the content powering your public portfolio from one place.</p></div><div className="admin-stats">{sections.slice(1).map((section) => <button key={section} onClick={() => onSelect(section)} className="admin-stat-card"><span>{section}</span><strong>{counts[section] ?? "—"}</strong><small>Manage →</small></button>)}</div></>; }

function ProfileEditor({ profile, onSaved }) {
  const [form, setForm] = useState({ ...emptyProfile, ...(profile || {}) }); const [saving, setSaving] = useState(false); const [status, setStatus] = useState("");
  useEffect(() => setForm({ ...emptyProfile, ...(profile || {}) }), [profile]);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const save = async (event) => { event.preventDefault(); setSaving(true); setStatus(""); try { const data = profile?.id ? await adminRequest(`/profile/${profile.id}`, { method: "PUT", body: JSON.stringify(form) }) : await adminRequest("/profile", { method: "POST", body: JSON.stringify(form) }); const saved = Array.isArray(data) ? data[0] : data; onSaved(saved); setStatus("Profile saved successfully."); } catch (err) { setStatus(err.message || "Failed to save profile."); } finally { setSaving(false); } };
  const fields = [["name", "Name", true], ["headline", "Headline"], ["email", "Email"], ["phone", "Phone"], ["location", "Location"], ["availability", "Availability"], ["profile_image_url", "Profile image URL"], ["resume_url", "Resume URL"], ["github_url", "GitHub URL"], ["linkedin_url", "LinkedIn URL"], ["website_url", "Website URL"]];
  return <form className="admin-editor" onSubmit={save}><div className="admin-form-grid">{fields.map(([key, label, required]) => <label key={key}>{label}<input type={key === "email" ? "email" : "text"} value={form[key] || ""} onChange={(e) => update(key, e.target.value)} required={required} /></label>)}</div><label>Bio<textarea rows="7" value={form.bio || ""} onChange={(e) => update("bio", e.target.value)} /></label>{status && <div className={status.includes("successfully") ? "admin-success" : "admin-error"}>{status}</div>}<div className="admin-editor-actions"><button className="admin-primary-button admin-save-button" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button></div></form>;
}

function ProjectsEditor({ projects, onChanged }) {
  const [editing, setEditing] = useState(null); const [status, setStatus] = useState("");
  const save = async (project) => { setStatus(""); try { const payload = { ...project, technologies: typeof project.technologies === "string" ? project.technologies.split(",").map((v) => v.trim()).filter(Boolean) : project.technologies, display_order: Number(project.display_order) || 0 }; const data = project.id ? await adminRequest(`/projects/${project.id}`, { method: "PUT", body: JSON.stringify(payload) }) : await adminRequest("/projects", { method: "POST", body: JSON.stringify(payload) }); setEditing(null); setStatus(project.id ? "Project updated successfully." : "Project created successfully."); await onChanged(); return data; } catch (err) { setStatus(err.message || "Failed to save project."); } };
  const remove = async (project) => { if (!window.confirm(`Delete “${project.title}”?`)) return; try { await adminRequest(`/projects/${project.id}`, { method: "DELETE" }); setStatus("Project deleted successfully."); await onChanged(); } catch (err) { setStatus(err.message || "Failed to delete project."); } };
  if (editing) return <ProjectForm initial={editing} onCancel={() => setEditing(null)} onSave={save} status={status} />;
  return <section><div className="admin-section-toolbar"><div><p className="admin-muted">{projects.length} project{projects.length === 1 ? "" : "s"}</p></div><button className="admin-primary-button admin-add-button" onClick={() => setEditing({ ...emptyProject })}>+ Add project</button></div>{status && <div className="admin-success">{status}</div>}<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Project</th><th>Featured</th><th>Order</th><th>Actions</th></tr></thead><tbody>{projects.length ? projects.map((project) => <tr key={project.id}><td><strong>{project.title}</strong><small>{project.slug}</small></td><td>{project.featured ? "Yes" : "No"}</td><td>{project.display_order ?? 0}</td><td><button onClick={() => setEditing({ ...project, technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || "" })}>Edit</button><button className="admin-danger-button" onClick={() => remove(project)}>Delete</button></td></tr>) : <tr><td colSpan="4" className="admin-empty-row">No projects yet. Add your first project.</td></tr>}</tbody></table></div></section>;
}

function ProjectForm({ initial, onCancel, onSave, status }) {
  const [form, setForm] = useState({ ...emptyProject, ...initial }); const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return <form className="admin-editor" onSubmit={(e) => { e.preventDefault(); onSave(form); }}><div className="admin-form-grid"><label>Title<input value={form.title || ""} onChange={(e) => update("title", e.target.value)} required /></label><label>Slug<input value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} required /></label><label>Short description<input value={form.short_description || ""} onChange={(e) => update("short_description", e.target.value)} /></label><label>Image URL<input value={form.image_url || ""} onChange={(e) => update("image_url", e.target.value)} /></label><label>GitHub URL<input value={form.github_url || ""} onChange={(e) => update("github_url", e.target.value)} /></label><label>Live URL<input value={form.live_url || ""} onChange={(e) => update("live_url", e.target.value)} /></label><label>Technologies<input placeholder="React, Node.js, Supabase" value={form.technologies || ""} onChange={(e) => update("technologies", e.target.value)} /></label><label>Display order<input type="number" value={form.display_order ?? 0} onChange={(e) => update("display_order", e.target.value)} /></label></div><label>Description<textarea rows="8" value={form.description || ""} onChange={(e) => update("description", e.target.value)} /></label><label className="admin-checkbox"><input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => update("featured", e.target.checked)} /> Featured project</label>{status && <div className="admin-error">{status}</div>}<div className="admin-editor-actions"><button type="button" className="admin-secondary-button" onClick={onCancel}>Cancel</button><button className="admin-primary-button admin-save-button">Save project</button></div></form>;
}

function ResourcePanel({ section }) { const descriptions = { Skills: "Maintain your skills, categories, icons and proficiency levels.", Experience: "Manage professional experience and technology details.", Education: "Manage education history and ordering.", "Social Links": "Keep your social profiles and external links up to date.", "Site Settings": "Control site metadata, accent color and contact settings." }; return <section className="admin-empty-panel"><div className="admin-panel-icon">{section.charAt(0)}</div><h2>{section}</h2><p>{descriptions[section]}</p><span className="admin-coming-soon">Editor coming next</span></section>; }
export default AdminDashboard;
