import { useState } from "react";
import { login } from "../services/api";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      const session = result?.session;

      if (!session?.access_token) {
        throw new Error("Login did not return a session.");
      }

      localStorage.setItem("portfolio_admin_token", session.access_token);
      onLogin(session);
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-screen">
      <form className="admin-auth-card" onSubmit={handleSubmit}>
        <p className="admin-eyebrow">Portfolio Admin</p>
        <h1>Welcome back.</h1>
        <p className="admin-muted">Sign in to manage your portfolio.</p>

        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <button className="admin-primary-button" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
