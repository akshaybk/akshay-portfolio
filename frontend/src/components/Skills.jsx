import Reveal from "./Reveal";

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
        <Reveal>
          <div className="skills-heading">
            <p className="section-label">EXPERTISE</p>

            <h2>Skills</h2>

            <p className="section-intro">
              Technologies and tools I work with.
            </p>
          </div>
        </Reveal>

        <div className="skills-categories">
          {Object.entries(groupedSkills).map(
            ([category, categorySkills], categoryIndex) => {
              const sortedSkills = [...categorySkills].sort(
                (a, b) =>
                  (b.proficiency ?? 0) -
                  (a.proficiency ?? 0)
              );

              return (
                <Reveal
                  key={category}
                  delay={categoryIndex * 0.08}
                >
                  <div className="skills-category">
                    <div className="skills-category-header">
                      <h3>{category}</h3>

                      <span className="skills-count">
                        {sortedSkills.length}
                        {sortedSkills.length === 1
                          ? " skill"
                          : " skills"}
                      </span>
                    </div>

                    <div className="skills-grid">
                      {sortedSkills.map((skill, skillIndex) => {
                        const proficiency =
                          skill.proficiency !== null &&
                          skill.proficiency !== undefined
                            ? Math.min(
                                Math.max(
                                  skill.proficiency,
                                  0
                                ),
                                100
                              )
                            : null;

                        return (
                          <Reveal
                            key={skill.id}
                            delay={skillIndex * 0.05}
                          >
                            <article className="skill-card">
                              <div className="skill-card-top">
                                <div className="skill-identity">
                                  {skill.icon && (
                                    <span className="skill-icon">
                                      {skill.icon}
                                    </span>
                                  )}

                                  <h4>{skill.name}</h4>
                                </div>

                                {proficiency !== null && (
                                  <span className="skill-percentage">
                                    {proficiency}%
                                  </span>
                                )}
                              </div>

                              {proficiency !== null && (
                                <div className="skill-proficiency">
                                  <div className="proficiency-track">
                                    <div
                                      className="proficiency-fill"
                                      style={{
                                        width: `${proficiency}%`
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </article>
                          </Reveal>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;