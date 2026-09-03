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
import "./projects-uniform.css";
import "./contact-polish.css";
import "./mobile-responsive.css";
import "./skeleton-loading.css";

const firstRecord = (value) => (Array.isArray(value) ? value[0] || null : value || null);
const records = (value) => (Array.isArray(value) ? value : value ? [value] : []);
const defaultVisibility = {
  hero: true,
  about: true,
  skills: true,
  experience: true,
  education: true,
  projects: true,
  contact: true,
  footer: true,
};

function PortfolioSkeleton() {
  return (
    <div className="skeleton-page" aria-hidden="true">
      <div className="skeleton-navbar">
        <span className="skeleton-block skeleton-logo" />
        <div className="skeleton-nav-links">
          <span className="skeleton-block" />
          <span className="skeleton-block" />
          <span className="skeleton-block" />
          <span className="skeleton-block" />
          <span className="skeleton-block" />
        </div>
      </div>

      <section className="skeleton-hero">
        <div className="skeleton-hero-content">
          <span className="skeleton-block skeleton-status" />
          <span className="skeleton-block skeleton-kicker" />
          <span className="skeleton-block skeleton-title" />
          <span className="skeleton-block skeleton-headline" />
          <span className="skeleton-block skeleton-headline-short" />
          <span className="skeleton-block skeleton-bio" />
          <div className="skeleton-actions">
            <span className="skeleton-block skeleton-button" />
            <span className="skeleton-block skeleton-button skeleton-button-secondary" />
          </div>
          <div className="skeleton-socials">
            <span className="skeleton-block" />
            <span className="skeleton-block" />
            <span className="skeleton-block" />
          </div>
        </div>
      </section>

      <section className="skeleton-section">
        <div className="skeleton-section-heading">
          <span className="skeleton-block skeleton-label" />
          <span className="skeleton-block skeleton-section-title" />
        </div>
        <div className="skeleton-section-lines">
          <span className="skeleton-block" />
          <span className="skeleton-block" />
          <span className="skeleton-block skeleton-line-short" />
        </div>
      </section>
    </div>
  );
}

function App() {
  const [portfolio, setPortfolio] = useState({ profile: null, projects: [], skills: [], experience: [], education: [], socialLinks: [], siteSettings: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const [profile, projects, skills, experience, education, socialLinks, siteSettings] = await Promise.all([
          getProfile(), getProjects(), getSkills(), getExperience(), getEducation(), getSocialLinks(), getSiteSettings()
        ]);
        setPortfolio({ profile: firstRecord(profile), projects: records(projects), skills: records(skills), experience: records(experience), education: records(education), socialLinks: records(socialLinks), siteSettings: firstRecord(siteSettings) });
      } catch (err) { console.error("Portfolio loading error:", err); setError(err.message || "Failed to load portfolio."); }
      finally { setLoading(false); }
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

  useEffect(() => {
    const title = portfolio.siteSettings?.site_title || portfolio.profile?.name || "Portfolio";
    document.title = title;
  }, [portfolio.siteSettings, portfolio.profile]);

  if (loading) return <PortfolioSkeleton />;
  if (error) return <div className="error-screen" role="alert">{error}</div>;

  const visibility = { ...defaultVisibility, ...(portfolio.siteSettings?.section_visibility || {}) };

  return (
    <>
      <Navbar profile={portfolio.profile} visibility={visibility} />
      <main>
        {visibility.hero && <Hero profile={portfolio.profile} visibility={visibility} />}
        {visibility.about && <About profile={portfolio.profile} />}
        {visibility.skills && <Skills skills={portfolio.skills} />}
        {visibility.experience && <Experience experience={portfolio.experience} />}
        {visibility.education && <Education education={portfolio.education} />}
        {visibility.projects && <Projects projects={portfolio.projects} />}
        {visibility.contact && <SocialLinks links={portfolio.socialLinks} />}
      </main>
      {visibility.footer && <Footer siteSettings={portfolio.siteSettings} />}
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
