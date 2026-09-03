import { motion } from "framer-motion";

function Hero({ profile, visibility = {} }) {
  const data = profile;

  if (!data) return null;

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
    <section id="home" className="hero-section">
      <div className="hero-background" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero-status-dot" aria-hidden="true" />
          {data.availability || "Open to opportunities"}
        </motion.div>

        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {data.name}
        </motion.h1>

        {data.headline && (
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {data.headline}
          </motion.h2>
        )}

        {data.bio && (
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {data.bio}
          </motion.p>
        )}

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a className="hero-primary-action" href={workTarget}>
            {visibility.projects !== false ? "View my work" : "Explore"} <span aria-hidden="true">↗</span>
          </a>
          {data.resume_url && <a className="hero-secondary-action" href={data.resume_url} target="_blank" rel="noopener noreferrer">Résumé</a>}
        </motion.div>

        {(data.github_url || data.linkedin_url) && (
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <span>Find me on</span>
            {data.github_url && <a href={data.github_url} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {data.linkedin_url && <a href={data.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </motion.div>
        )}
      </div>

      {nextSection && (
        <a className="hero-scroll-hint" href={`#${nextSection.id}`} aria-label={`Scroll to ${nextSection.id} section`}>
          <span>Scroll to explore</span>
          <span aria-hidden="true">↓</span>
        </a>
      )}
    </section>
  );
}

export default Hero;
