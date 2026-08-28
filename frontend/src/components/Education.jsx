import Reveal from "./Reveal";

function Education({ education }) {
  if (!education || education.length === 0) return null;

  const sortedEducation = [...education].sort((a, b) => new Date(b.start_date || 0) - new Date(a.start_date || 0));

  return (
    <section id="education" className="section">
      <div className="section-container">
        <Reveal><div className="education-heading"><p className="section-label">EDUCATION</p><h2>Education</h2><p className="section-intro">My academic background and learning journey.</p></div></Reveal>
        <div className="education-list">
          {sortedEducation.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="education-item">
                <div className="education-period">{item.start_date && <span>{formatDate(item.start_date)}</span>}{item.start_date && <span>—</span>}<span>{item.end_date ? formatDate(item.end_date) : "Present"}</span></div>
                <div className="education-content">
                  <h3>{item.degree}</h3>
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
