const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

const request = async (endpoint, options = {}) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
  } catch {
    throw new Error(`Unable to reach the API at ${API_BASE_URL}. Make sure the backend is running.`);
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    const detail = result.error ? `: ${result.error}` : "";
    throw new Error(result.message ? `${result.message}${detail}` : `Request failed (${response.status})`);
  }

  return result.data;
};

const fetchData = (endpoint) => request(endpoint);

export const getProfile = () => fetchData("/profile");
export const getProjects = () => fetchData("/projects");
export const getSkills = () => fetchData("/skills");
export const getExperience = () => fetchData("/experience");
export const getEducation = () => fetchData("/education");
export const getSocialLinks = () => fetchData("/social-links");
export const getSiteSettings = () => fetchData("/site-settings");

export const login = async (email, password) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
};

export const getMe = () => {
  const token = localStorage.getItem("portfolio_admin_token");
  if (!token) throw new Error("Admin session is missing. Please sign in again.");
  return request("/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const adminRequest = (endpoint, options = {}) => {
  const token = localStorage.getItem("portfolio_admin_token");
  if (!token) throw new Error("Admin session is missing. Please sign in again.");

  return request(endpoint, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });
};
