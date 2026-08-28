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

  useEffect(() => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) {
      setChecking(false);
      return;
    }

    getMe()
      .then(() => setAuthenticated(true))
      .catch(() => localStorage.removeItem("portfolio_admin_token"))
      .finally(() => setChecking(false));
  }, []);

  const isAdmin = window.location.pathname.startsWith("/admin");

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
