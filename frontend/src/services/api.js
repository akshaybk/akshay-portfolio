const API_BASE_URL = "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Request failed: ${endpoint}`);
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

export const getMe = () =>
  request("/auth/me", {
    headers: { Authorization: `Bearer ${localStorage.getItem("portfolio_admin_token")}` }
  });

export const adminRequest = (endpoint, options = {}) =>
  request(endpoint, {
    ...options,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("portfolio_admin_token")}`,
      ...(options.headers || {})
    }
  });
