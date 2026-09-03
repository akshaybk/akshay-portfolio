import Reveal from "./Reveal";

function Education({ education }) {
  if (!Array.isArray(education) || education.length === 0) return null;

  const sortedEducation = education
    .filter((item) => item && typeof item === "object")
    .sort((a, b) => new Date(b.start_date || 0) - new Date(a.start_date || 0));

  if (sortedEducation.length === 0) return null;

  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="section-container">
        <Reveal>
          <div className="education-heading">
            <p className="section-label">EDUCATION</p>
            <h2 id="education-title">Education</h2>
            <p className="section-intro">My academic background and learning journey.</p>
          </div>
        </Reveal>
        <div className="education-list">
          {sortedEducation.map((item, index) => (
            <Reveal key={item.id || `${item.degree || "education"}-${index}`} delay={index * 0.08}>
              <article className="education-item">
                <div className="education-period">
                  {item.start_date && <time dateTime={item.start_date}>{formatDate(item.start_date)}</time>}
                  {item.start_date && <span aria-hidden="true">—</span>}
                  <time dateTime={item.end_date || undefined}>{item.end_date ? formatDate(item.end_date) : "Present"}</time>
                </div>
                <div className="education-content">
                  <h3>{item.degree || "Education"}</h3>
                  {item.field && <p className="education-field">{item.field}</p>}
                  {item.institution && <p className="education-institution">{item.institution}</p>}
                  {item.location && <p className="education-location">{item.location}</p>}
                  {item.description && <p className="education-description">{item.description}</p>}
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

export default Education;
