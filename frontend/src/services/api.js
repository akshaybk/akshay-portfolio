const API_BASE_URL = "http://localhost:5000/api";

const fetchData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "API request failed");
  }

  return result.data;
};

export const getProfile = () => fetchData("/profile");

export const getProjects = () => fetchData("/projects");

export const getSkills = () => fetchData("/skills");

export const getExperience = () => fetchData("/experience");

export const getEducation = () => fetchData("/education");

export const getSocialLinks = () => fetchData("/social-links");

export const getSiteSettings = () => fetchData("/site-settings");