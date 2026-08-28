import { useEffect, useState } from "react";
import {
  getProfile,
  getProjects,
  getSkills,
  getExperience,
  getEducation,
  getSocialLinks,
  getSiteSettings
} from "./services/api";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import SocialLinks from "./components/SocialLinks";
import Footer from "./components/Footer";

import "./App.css";
import "./portfolio-polish.css";
import "./projects-showcase.css";
import "./contact-polish.css";

const firstRecord = (value) => (Array.isArray(value) ? value[0] || null : value || null);
const records = (value) => (Array.isArray(value) ? value : value ? [value] : []);

function App() {
  const [portfolio, setPortfolio] = useState({
    profile: null,
    projects: [],
    skills: [],
    experience: [],
    education: [],
    socialLinks: [],
    siteSettings: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const [profile, projects, skills, experience, education, socialLinks, siteSettings] = await Promise.all([
          getProfile(), getProjects(), getSkills(), getExperience(), getEducation(), getSocialLinks(), getSiteSettings()
        ]);

        setPortfolio({
          profile: firstRecord(profile),
          projects: records(projects),
          skills: records(skills),
          experience: records(experience),
          education: records(education),
          socialLinks: records(socialLinks),
          siteSettings: firstRecord(siteSettings)
        });
      } catch (err) {
        console.error("Portfolio loading error:", err);
        setError(err.message || "Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  useEffect(() => {
    const accentColor = portfolio.siteSettings?.accent_color;
    if (!accentColor) return;

    document.documentElement.style.setProperty("--accent-color", accentColor);
    document.documentElement.style.setProperty("--accent-soft", hexToRgba(accentColor, 0.12));
    document.documentElement.style.setProperty("--accent-border", hexToRgba(accentColor, 0.45));
  }, [portfolio.siteSettings]);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (error) return <div className="error-screen">{error}</div>;

  return (
    <>
      <Navbar profile={portfolio.profile} />
      <main>
        <Hero profile={portfolio.profile} siteSettings={portfolio.siteSettings} />
        <About profile={portfolio.profile} />
        <Skills skills={portfolio.skills} />
        <Experience experience={portfolio.experience} />
        <Education education={portfolio.education} />
        <Projects projects={portfolio.projects} />
        <SocialLinks links={portfolio.socialLinks} />
      </main>
      <Footer siteSettings={portfolio.siteSettings} />
    </>
  );
}

function hexToRgba(hex, alpha) {
  const cleanHex = String(hex).replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) return `rgba(124, 58, 237, ${alpha})`;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default App;
