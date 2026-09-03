import Reveal from "./Reveal";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaDiscord,
  FaGlobe
} from "react-icons/fa";

function SocialLinks({ links }) {
  if (!links || links.length === 0) {
    return null;
  }

  const sortedLinks = [...links].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );

  const getIcon = (platform) => {
    const name = platform?.toLowerCase();

    if (name === "github") return <FaGithub />;
    if (name === "linkedin") return <FaLinkedin />;
    if (name === "twitter" || name === "x") return <FaTwitter />;
    if (name === "instagram") return <FaInstagram />;
    if (name === "facebook") return <FaFacebook />;
    if (name === "youtube") return <FaYoutube />;
    if (name === "discord") return <FaDiscord />;

    return <FaGlobe />;
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="section-container">
        <Reveal>
          <div className="contact-content">
            <p className="section-label">CONTACT</p>

            <h2 id="contact-title">Let's Connect</h2>

            <p className="contact-description">
              Interested in working together, discussing a project,
              or simply saying hello? Feel free to reach out.
            </p>

            <div className="social-links" aria-label="Social and contact links">
              {sortedLinks.map((link, index) => (
                <Reveal key={link.id} delay={index * 0.08}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                    aria-label={`Open ${link.platform} in a new tab`}
                  >
                    <span className="social-icon" aria-hidden="true">
                      {getIcon(link.platform)}
                    </span>

                    <span>{link.platform}</span>

                    <span className="social-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default SocialLinks;
