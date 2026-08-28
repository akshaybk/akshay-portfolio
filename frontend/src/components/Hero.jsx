import { motion } from "framer-motion";

function Hero({ profile }) {
  const data = profile;

  if (!data) return null;

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <motion.p className="hero-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {data.availability || "Open to opportunities"}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          {data.name}
        </motion.h1>
        {data.headline && (
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {data.headline}
          </motion.h2>
        )}
        {data.bio && (
          <motion.p className="hero-bio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            {data.bio}
          </motion.p>
        )}
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <a className="hero-primary-action" href="#projects">View my work</a>
          {data.resume_url && <a className="hero-secondary-action" href={data.resume_url} target="_blank" rel="noopener noreferrer">View résumé</a>}
          {data.github_url && <a className="hero-secondary-action" href={data.github_url} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {data.linkedin_url && <a className="hero-secondary-action" href={data.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
