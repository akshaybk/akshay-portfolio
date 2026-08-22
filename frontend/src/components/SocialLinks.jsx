function SocialLinks({ links }) {
  if (!links || links.length === 0) {
    return null;
  }

  const sortedLinks = [...links].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );

  return (
    <section id="contact" className="section contact-section">
      <div className="section-container">
        <div className="contact-content">
          <p className="section-label">CONTACT</p>

          <h2>Let's Connect</h2>

          <p className="contact-description">
            Interested in working together, discussing a project,
            or simply saying hello? Feel free to reach out.
          </p>

          <div className="social-links">
            {sortedLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                {link.icon && (
                  <span className="social-icon">
                    {link.icon}
                  </span>
                )}

                <span>{link.platform}</span>

                <span className="social-arrow">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialLinks;