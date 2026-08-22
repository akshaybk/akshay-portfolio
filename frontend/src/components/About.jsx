import Reveal from "./Reveal";

function About({ profile }) {
  const data = profile?.[0];

  if (!data) return null;

  return (
    <section id="about" className="section">
      <div className="section-container about-container">
        <Reveal direction="left">
          <div className="about-heading">
            <p className="section-label">ABOUT</p>
            <h2>About Me</h2>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <div className="about-content">
            <p className="section-text">
              {data.bio}
            </p>

            <div className="about-details">
              {data.location && (
                <div className="about-detail">
                  <span className="detail-label">
                    Location
                  </span>

                  <span>{data.location}</span>
                </div>
              )}

              {data.availability && (
                <div className="about-detail">
                  <span className="detail-label">
                    Availability
                  </span>

                  <span>{data.availability}</span>
                </div>
              )}

              {data.email && (
                <div className="about-detail">
                  <span className="detail-label">
                    Email
                  </span>

                  <a href={`mailto:${data.email}`}>
                    {data.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;