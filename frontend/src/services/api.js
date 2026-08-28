const API_BASE_URL = "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

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
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  return data;
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
