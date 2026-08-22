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
        const [
          profile,
          projects,
          skills,
          experience,
          education,
          socialLinks,
          siteSettings
        ] = await Promise.all([
          getProfile(),
          getProjects(),
          getSkills(),
          getExperience(),
          getEducation(),
          getSocialLinks(),
          getSiteSettings()
        ]);

        setPortfolio({
          profile,
          projects,
          skills,
          experience,
          education,
          socialLinks,
          siteSettings
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        {error}
      </div>
    );
  }

  return (
    <>
      <Navbar profile={portfolio.profile} />

      <main>
        <Hero
          profile={portfolio.profile}
          siteSettings={portfolio.siteSettings}
        />

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

export default App;