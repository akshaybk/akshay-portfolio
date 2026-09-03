import { motion } from "framer-motion";
import "./Hero.css";

function Hero({ profile, visibility = {} }) {
  if (!profile || typeof profile !== "object") return null;

  const name = typeof profile.name === "string" ? profile.name.trim() : "";
  const headline = typeof profile.headline === "string" ? profile.headline.trim() : "";
  const bio = typeof profile.bio === "string" ? profile.bio.trim() : "";
  const availability = typeof profile.availability === "string" ? profile.availability.trim() : "";
  const resumeUrl = typeof profile.resume_url === "string" ? profile.resume_url.trim() : "";
  const githubUrl = typeof profile.github_url === "string" ? profile.github_url.trim() : "";
  const linkedinUrl = typeof profile.linkedin_url === "string" ? profile.linkedin_url.trim() : "";

  const nextSection = [
    { key: "about", id: "about" },
    { key: "skills", id: "skills" },
    { key: "experience", id: "experience" },
    { key: "education", id: "education" },
    { key: "projects", id: "projects" },
    { key: "contact", id: "contact" }
  ].find((section) => visibility[section.key] !== false);

  const workTarget = visibility.projects !== false
    ? "#projects"
    : nextSection
      ? `#${nextSection.id}`
      : "#";

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
      </div>

      <div className="hero-content">
        <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="hero-status-dot" aria-hidden="true" />
          {availability || "Open to opportunities"}
        </motion.div>

        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}>
          Hello, I'm
        </motion.p>

        <motion.h1 id="hero-title" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
          {name || "Portfolio"}
        </motion.h1>

        {headline && <motion.h2 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}>{headline}</motion.h2>}

        {bio && <motion.p className="hero-bio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>{bio}</motion.p>}

        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <a className="hero-primary-action" href={workTarget}>
            <span>{visibility.projects !== false ? "View my work" : "Explore"}</span>
          </a>
          <a
            className="hero-secondary-action"
            href={resumeUrl || "#contact"}
            {...(resumeUrl ? { download: true } : {})}
            aria-label={resumeUrl ? "Download CV" : "CV - add your CV in the admin dashboard"}
          >
            <span>Download CV</span>
          </a>
        </motion.div>

        {(githubUrl || linkedinUrl) && (
          <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }}>
            <span>Find me on</span>
            {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </motion.div>
        )}
      </div>

      {nextSection && <a className="hero-scroll-hint" href={`#${nextSection.id}`} aria-label={`Scroll to ${nextSection.id} section`}><span>Scroll to explore</span><span aria-hidden="true">↓</span></a>}
    </section>
  );
}

export default Hero;
