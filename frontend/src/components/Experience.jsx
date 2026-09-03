import Reveal from "./Reveal";

function Experience({ experience }) {
  if (!Array.isArray(experience) || experience.length === 0) return null;

  const sortedExperience = experience
    .filter((item) => item && typeof item === "object")
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  if (sortedExperience.length === 0) return null;

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="section-container">
        <Reveal>
          <div className="experience-heading">
            <p className="section-label">CAREER</p>
            <h2 id="experience-title">Experience</h2>
            <p className="section-intro">My professional experience and the work I've been involved in.</p>
          </div>
        </Reveal>
        <div className="experience-list">
          {sortedExperience.map((item, index) => (
            <Reveal key={item.id || `${item.company || "experience"}-${index}`} delay={index * 0.08}>
              <article className="experience-item">
                <div className="experience-timeline" aria-hidden="true">
                  <span className="experience-dot" />
                  {index !== sortedExperience.length - 1 && <span className="experience-line" />}
                </div>
                <div className="experience-content">
                  <div className="experience-top">
                    <div className="experience-heading-group">
                      {item.role && <p className="experience-role">{item.role}</p>}
                      <h3>{item.company || "Experience"}</h3>
                    </div>
                    <div className="experience-meta">
                      {item.start_date && <time dateTime={item.start_date}>{formatDate(item.start_date)}</time>}
                      {item.start_date && <span className="experience-separator" aria-hidden="true">—</span>}
                      <time dateTime={item.current ? undefined : item.end_date || undefined} className={item.current ? "experience-current" : ""}>
                        {item.current || !item.end_date ? "Present" : formatDate(item.end_date)}
                      </time>
                    </div>
                  </div>
                  {item.location && <p className="experience-location">{item.location}</p>}
                  {item.description && <p className="experience-description">{item.description}</p>}
                  {Array.isArray(item.technologies) && item.technologies.length > 0 && (
                    <div className="experience-technologies" aria-label="Technologies used">
                      {item.technologies.filter(Boolean).map((technology, technologyIndex) => (
                        <span key={`${technology}-${technologyIndex}`}>{technology}</span>
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

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
}

export default Experience;
