function Skills({ skills }) {
  if (!skills || skills.length === 0) {
    return null;
  }

  const groupedSkills = skills.reduce((groups, skill) => {
    const category = skill.category || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(skill);

    return groups;
  }, {});

  return (
    <section id="skills" className="section">
      <div className="section-container">
        <div className="skills-heading">
          <p className="section-label">EXPERTISE</p>
          <h2>Skills</h2>
          <p className="section-intro">
            Technologies and tools I work with.
          </p>
        </div>

        <div className="skills-categories">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div className="skills-category" key={category}>
              <h3>{category}</h3>

              <div className="skills-grid">
                {categorySkills.map((skill) => (
                  <div className="skill-card" key={skill.id}>
                    <div className="skill-card-top">
                      {skill.icon && (
                        <span className="skill-icon">
                          {skill.icon}
                        </span>
                      )}

                      <h4>{skill.name}</h4>
                    </div>

                    {skill.proficiency !== null &&
                      skill.proficiency !== undefined && (
                        <div className="skill-proficiency">
                          <div className="proficiency-header">
                            <span>Proficiency</span>
                            <span>{skill.proficiency}%</span>
                          </div>

                          <div className="proficiency-track">
                            <div
                              className="proficiency-fill"
                              style={{
                                width: `${Math.min(
                                  Math.max(skill.proficiency, 0),
                                  100
                                )}%`
                              }}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;