import Reveal from "./Reveal";

function Experience({ experience }) {
  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="section">
      <div className="section-container">
        <Reveal>
          <div className="experience-heading">
            <p className="section-label">CAREER</p>
            <h2>Experience</h2>
            <p className="section-intro">
              My professional experience and the work I've been involved in.
            </p>
          </div>
        </Reveal>

        <div className="experience-list">
          {experience.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="experience-item">
                <div className="experience-timeline">
                  <span className="experience-dot" />
                  <span className="experience-line" />
                </div>

                <div className="experience-content">
                  <div className="experience-top">
                    <div>
                      <p className="experience-role">
                        {item.role}
                      </p>

                      <h3>{item.company}</h3>
                    </div>

                    <div className="experience-meta">
                      {item.start_date && (
                        <span>
                          {formatDate(item.start_date)}
                        </span>
                      )}

                      {item.start_date && (
                        <span>—</span>
                      )}

                      <span>
                        {item.current
                          ? "Present"
                          : item.end_date
                            ? formatDate(item.end_date)
                            : "Present"}
                      </span>
                    </div>
                  </div>

                  {item.location && (
                    <p className="experience-location">
                      {item.location}
                    </p>
                  )}

                  {item.description && (
                    <p className="experience-description">
                      {item.description}
                    </p>
                  )}

                  {item.technologies?.length > 0 && (
                    <div className="experience-technologies">
                      {item.technologies.map((technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export default Experience;