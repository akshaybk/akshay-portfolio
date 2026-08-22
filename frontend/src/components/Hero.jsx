import { motion } from "framer-motion";

function Hero({ profile }) {
  const data = profile?.[0];

  if (!data) return null;

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">

        <motion.p
          className="hero-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {data.availability || "Open to opportunities"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1
          }}
        >
          {data.name}
        </motion.h1>

        {data.headline && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
          >
            {data.headline}
          </motion.h2>
        )}

        {data.bio && (
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3
            }}
          >
            {data.bio}
          </motion.p>
        )}

        {(data.github_url || data.linkedin_url) && (
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4
            }}
          >
            {data.github_url && (
              <a
                href={data.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}

            {data.linkedin_url && (
              <a
                href={data.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}

export default Hero;