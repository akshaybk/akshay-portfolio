import { useEffect, useState } from "react";
import { adminRequest, getEducation, getExperience, getProjects, getProfile, getSiteSettings, getSkills, getSocialLinks } from "../services/api";

const sections = ["Overview", "Profile", "Projects", "Skills", "Experience", "Education", "Social Links", "Site Settings"];

function AdminDashboard({ onLogout }) {
  const [active, setActive] = useState("Overview");
  const [counts, setCounts] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [profile, projects, skills, experience, education, socialLinks, settings] = await Promise.all([
          getProfile(), getProjects(), getSkills(), getExperience(), getEducation(), getSocialLinks(), getSiteSettings()
        ]);
        setCounts({
          Profile: profile ? 1 : 0,
          Projects: projects?.length || 0,
          Skills: skills?.length || 0,
          Experience: experience?.length || 0,
          Education: education?.length || 0,
          "Social Links": socialLinks?.length || 0,
          "Site Settings": settings ? 1 : 0
        });
      } catch (err) {
        setMessage("Could not load portfolio data. Check that the API is running.");
      }
    };
    load();
  }, []);

  const logout = () => {
    localStorage.removeItem("portfolio_admin_token");
    onLogout();
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-brand">AKSHAY<span>.</span></div>
          <p className="admin-sidebar-label">Management</p>
          <nav>
            {sections.map((section) => (
              <button key={section} className={active === section ? "active" : ""} onClick={() => setActive(section)}>
                {section}
              </button>
            ))}
          </nav>
        </div>
        <button className="admin-logout" onClick={logout}>Sign out</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">Admin Dashboard</p>
            <h1>{active}</h1>
          </div>
          <a href="/" className="admin-view-site">View portfolio ↗</a>
        </header>

        {message && <div className="admin-notice">{message}</div>}

        {active === "Overview" ? (
          <>
            <div className="admin-welcome">
              <p className="admin-eyebrow">Control center</p>
              <h2>Keep your portfolio current.</h2>
              <p>Manage the content powering your public portfolio from one place.</p>
            </div>
            <div className="admin-stats">
              {sections.slice(1).map((section) => (
                <button key={section} onClick={() => setActive(section)} className="admin-stat-card">
                  <span>{section}</span>
                  <strong>{counts[section] ?? "—"}</strong>
                  <small>Manage →</small>
                </button>
              ))}
            </div>
          </>
        ) : (
          <ResourcePanel section={active} />
        )}
      </main>
    </div>
  );
}

function ResourcePanel({ section }) {
  const descriptions = {
    Profile: "Update your identity, bio, contact information and resume.",
    Projects: "Create, edit and organize the projects displayed on your portfolio.",
    Skills: "Maintain your skills, categories, icons and proficiency levels.",
    Experience: "Manage professional experience and technology details.",
    Education: "Manage education history and ordering.",
    "Social Links": "Keep your social profiles and external links up to date.",
    "Site Settings": "Control site metadata, accent color and contact settings."
  };

  return (
    <section className="admin-empty-panel">
      <div className="admin-panel-icon">{section.charAt(0)}</div>
      <h2>{section}</h2>
      <p>{descriptions[section]}</p>
      <span className="admin-coming-soon">Editor coming next</span>
    </section>
  );
}

export default AdminDashboard;
