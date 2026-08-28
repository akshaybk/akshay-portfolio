import { useEffect, useState } from "react";
import { adminRequest, getEducation, getExperience, getProjects, getProfile, getSiteSettings, getSkills, getSocialLinks } from "../services/api";

const sections = ["Overview", "Profile", "Projects", "Skills", "Experience", "Education", "Social Links", "Site Settings"];
const emptyProfile = { name: "", headline: "", bio: "", email: "", phone: "", location: "", profile_image_url: "", resume_url: "", availability: "", github_url: "", linkedin_url: "", website_url: "" };

function AdminDashboard({ onLogout }) {
  const [active, setActive] = useState("Overview");
  const [counts, setCounts] = useState({});
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileData, projects, skills, experience, education, socialLinks, settings] = await Promise.all([getProfile(), getProjects(), getSkills(), getExperience(), getEducation(), getSocialLinks(), getSiteSettings()]);
        setProfile(Array.isArray(profileData) ? profileData[0] || null : profileData || null);
        setCounts({ Profile: profileData ? 1 : 0, Projects: projects?.length || 0, Skills: skills?.length || 0, Experience: experience?.length || 0, Education: education?.length || 0, "Social Links": socialLinks?.length || 0, "Site Settings": settings ? 1 : 0 });
      } catch (err) { setMessage("Could not load portfolio data. Check that the API is running."); }
    };
    load();
  }, []);

  return <div className="admin-shell">
    <aside className="admin-sidebar"><div><div className="admin-brand">AKSHAY<span>.</span></div><p className="admin-sidebar-label">Management</p><nav>{sections.map((section) => <button key={section} className={active === section ? "active" : ""} onClick={() => setActive(section)}>{section}</button>)}</nav></div><button className="admin-logout" onClick={() => { localStorage.removeItem("portfolio_admin_token"); onLogout(); }}>Sign out</button></aside>
    <main className="admin-main"><header className="admin-header"><div><p className="admin-eyebrow">Admin Dashboard</p><h1>{active}</h1></div><a href="/" className="admin-view-site">View portfolio ↗</a></header>
      {message && <div className="admin-notice">{message}</div>}
      {active === "Overview" ? <Overview counts={counts} onSelect={setActive} /> : active === "Profile" ? <ProfileEditor profile={profile} onSaved={(saved) => { setProfile(saved); setCounts((c) => ({ ...c, Profile: 1 })); }} /> : <ResourcePanel section={active} />}
    </main>
  </div>;
}

function Overview({ counts, onSelect }) {
  return <><div className="admin-welcome"><p className="admin-eyebrow">Control center</p><h2>Keep your portfolio current.</h2><p>Manage the content powering your public portfolio from one place.</p></div><div className="admin-stats">{sections.slice(1).map((section) => <button key={section} onClick={() => onSelect(section)} className="admin-stat-card"><span>{section}</span><strong>{counts[section] ?? "—"}</strong><small>Manage →</small></button>)}</div></>;
}

function ProfileEditor({ profile, onSaved }) {
  const [form, setForm] = useState({ ...emptyProfile, ...(profile || {}) });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => setForm({ ...emptyProfile, ...(profile || {}) }), [profile]);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const save = async (event) => {
    event.preventDefault(); setSaving(true); setStatus("");
    try {
      const data = profile?.id ? await adminRequest(`/profile/${profile.id}`, { method: "PUT", body: JSON.stringify(form) }) : await adminRequest("/profile", { method: "POST", body: JSON.stringify(form) });
      const saved = Array.isArray(data) ? data[0] : data;
      onSaved(saved); setStatus("Profile saved successfully.");
    } catch (err) { setStatus(err.message || "Failed to save profile."); } finally { setSaving(false); }
  };
  const fields = [["name", "Name", true], ["headline", "Headline"], ["email", "Email"], ["phone", "Phone"], ["location", "Location"], ["availability", "Availability"], ["profile_image_url", "Profile image URL"], ["resume_url", "Resume URL"], ["github_url", "GitHub URL"], ["linkedin_url", "LinkedIn URL"], ["website_url", "Website URL"]];
  return <form className="admin-editor" onSubmit={save}><div className="admin-form-grid">{fields.map(([key, label, required]) => <label key={key}>{label}<input type={key === "email" ? "email" : "text"} value={form[key] || ""} onChange={(e) => update(key, e.target.value)} required={required} /></label>)}</div><label>Bio<textarea rows="7" value={form.bio || ""} onChange={(e) => update("bio", e.target.value)} /></label>{status && <div className={status.includes("successfully") ? "admin-success" : "admin-error"}>{status}</div>}<div className="admin-editor-actions"><button className="admin-primary-button admin-save-button" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button></div></form>;
}

function ResourcePanel({ section }) {
  const descriptions = { Projects: "Create, edit and organize the projects displayed on your portfolio.", Skills: "Maintain your skills, categories, icons and proficiency levels.", Experience: "Manage professional experience and technology details.", Education: "Manage education history and ordering.", "Social Links": "Keep your social profiles and external links up to date.", "Site Settings": "Control site metadata, accent color and contact settings." };
  return <section className="admin-empty-panel"><div className="admin-panel-icon">{section.charAt(0)}</div><h2>{section}</h2><p>{descriptions[section]}</p><span className="admin-coming-soon">Editor coming next</span></section>;
}
export default AdminDashboard;
