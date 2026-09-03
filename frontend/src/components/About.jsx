import Reveal from "./Reveal";

function About({ profile }) {
  if (!profile || typeof profile !== "object") return null;

  const bio = typeof profile.bio === "string" ? profile.bio.trim() : "";
  const location = typeof profile.location === "string" ? profile.location.trim() : "";
  const availability = typeof profile.availability === "string" ? profile.availability.trim() : "";
  const email = typeof profile.email === "string" ? profile.email.trim() : "";

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="section-container about-container">
        <Reveal direction="left">
          <div className="about-heading">
            <p className="section-label">ABOUT</p>
            <h2 id="about-title">About Me</h2>
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <div className="about-content">
            {bio && <p className="section-text">{bio}</p>}
            {(location || availability || email) && (
              <div className="about-details">
                {location && <div className="about-detail"><span className="detail-label">Location</span><span>{location}</span></div>}
                {availability && <div className="about-detail"><span className="detail-label">Availability</span><span>{availability}</span></div>}
                {email && <div className="about-detail"><span className="detail-label">Email</span><a href={`mailto:${email}`}>{email}</a></div>}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;
