import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./admin/admin.css";
import App from "./App.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import { getMe } from "./services/api";

function Root() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  // Vite's BASE_URL is /akshay-portfolio/ on GitHub Pages and / on a custom domain.
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pathname = window.location.pathname.replace(/\/$/, "");
  const isAdmin = pathname === `${basePath}/admin` || pathname.startsWith(`${basePath}/admin/`);

  useEffect(() => {
    // Public portfolio pages must never validate or send an admin JWT.
    if (!isAdmin) {
      setChecking(false);
      return;
    }

    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) {
      setChecking(false);
      return;
    }

    getMe()
      .then(() => setAuthenticated(true))
      .catch(() => localStorage.removeItem("portfolio_admin_token"))
      .finally(() => setChecking(false));
  }, [isAdmin]);

  if (!isAdmin) return <App />;
  if (checking) return <div className="admin-auth-screen">Checking session...</div>;
  if (!authenticated) return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
