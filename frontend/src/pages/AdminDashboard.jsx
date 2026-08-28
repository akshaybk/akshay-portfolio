import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/api";
import "./Admin.css";

const sections = [
  { key: "profile", label: "Profile" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "social-links", label: "Social Links" },
  { key: "site-settings", label: "Site Settings" }
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    getMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("portfolio_admin_token");
        setError("Your session has expired. Please sign in again.");
        navigate("/admin/login", { replace: true });
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("portfolio_admin_token");
    navigate("/admin/login", { replace: true });
  };

  if (error || !user) {
    return <div className="admin-loading">{error || "Checking session…"}</div>;
  }

  return (
    <main className="admin-dashboard-page">
      <aside className="admin-sidebar">
        <div>
          <p className="admin-eyebrow">Portfolio Admin</p>
          <h1>Dashboard</h1>
        </div>

        <nav className="admin-nav" aria-label="Admin sections">
          {sections.map((section) => (
            <button key={section.key} type="button">
              {section.label}
            </button>
          ))}
        </nav>

        <button className="admin-logout" type="button" onClick={logout}>
          Sign out
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">Overview</p>
            <h2>Welcome back</h2>
          </div>
          <span className="admin-user">{user.email}</span>
        </header>

        <div className="admin-stat-grid">
          <article className="admin-stat-card">
            <span>Content sections</span>
            <strong>{sections.length}</strong>
          </article>
          <article className="admin-stat-card">
            <span>Authentication</span>
            <strong>Active</strong>
          </article>
          <article className="admin-stat-card">
            <span>Environment</span>
            <strong>Protected</strong>
          </article>
        </div>

        <section className="admin-panel">
          <p className="admin-eyebrow">Content Management</p>
          <h3>Select a section</h3>
          <p className="admin-muted">
            CRUD editors for each portfolio resource will live here. The API
            already protects create, update, and delete operations.
          </p>
        </section>
      </section>
    </main>
  );
}

export default AdminDashboard;
