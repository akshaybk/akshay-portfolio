function Hero({ profile, siteSettings }) {
  const data = profile?.[0];

  if (!data) return null;

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <p className="hero-label">
          {data.availability || "Open to opportunities"}
        </p>

        <h1>{data.name}</h1>

        <h2>{data.headline}</h2>

        <p className="hero-bio">
          {data.bio}
        </p>

        <div className="hero-actions">
          {data.github_url && (
            <a
              href={data.github_url}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}

          {data.linkedin_url && (
            <a
              href={data.linkedin_url}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;