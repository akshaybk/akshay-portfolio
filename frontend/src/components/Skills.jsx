import { Icon } from "@iconify/react";
import Reveal from "./Reveal";

const skillIconMap = {
  javascript: "simple-icons:javascript",
  js: "simple-icons:javascript",
  python: "simple-icons:python",
  java: "simple-icons:openjdk",
  html: "simple-icons:html5",
  css: "simple-icons:css3",
  react: "simple-icons:react",
  "node.js": "simple-icons:nodedotjs",
  node: "simple-icons:nodedotjs",
  express: "simple-icons:express",
  "express.js": "simple-icons:express",
  supabase: "simple-icons:supabase",
  mysql: "simple-icons:mysql",
  postgresql: "simple-icons:postgresql",
  postgres: "simple-icons:postgresql",
  mongodb: "simple-icons:mongodb",
  git: "simple-icons:git",
  github: "simple-icons:github",
  typescript: "simple-icons:typescript",
  tailwind: "simple-icons:tailwindcss",
  "tailwind css": "simple-icons:tailwindcss",
};

const categoryIconMap = {
  frontend: "lucide:code-2",
  programming: "lucide:terminal",
  backend: "lucide:server",
  database: "lucide:database",
  tools: "lucide:wrench",
  devops: "lucide:workflow",
};

function getSkillIcon(skillName) {
  const key = skillName?.trim().toLowerCase();
  return skillIconMap[key] || "lucide:code-2";
}

function getCategoryIcon(category) {
  const key = category?.trim().toLowerCase();
  return categoryIconMap[key] || "lucide:layers-3";
}

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
            <p className="section-intro">Technologies and tools I work with.</p>
          </div>
        </Reveal>

        <div className="skills-categories">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <Reveal key={category} delay={categoryIndex * 0.08}>
              <div className="skills-category">
                <div className="skills-category-header">
                  <div className="skills-category-title">
                    <span className="skills-category-icon" aria-hidden="true">
                      <Icon icon={getCategoryIcon(category)} width="18" height="18" />
                    </span>
                    <h3>{category}</h3>
                  </div>

                  <span className="skills-count">
                    {categorySkills.length}
                    {categorySkills.length === 1 ? " skill" : " skills"}
                  </span>
                </div>

                <div className="skills-grid">
                  {categorySkills.map((skill, skillIndex) => {
                    const proficiency =
                      skill.proficiency !== null && skill.proficiency !== undefined
                        ? Math.min(Math.max(Number(skill.proficiency) || 0, 0), 100)
                        : null;

                    return (
                      <Reveal key={skill.id || `${category}-${skill.name}`} delay={skillIndex * 0.05}>
                        <article className="skill-card">
                          <div className="skill-card-top">
                            <div className="skill-identity">
                              <span className="skill-icon" aria-hidden="true">
                                <Icon icon={getSkillIcon(skill.name)} width="22" height="22" />
                              </span>
                              <h4>{skill.name}</h4>
                            </div>

                            {proficiency !== null && (
                              <span className="skill-percentage">{proficiency}%</span>
                            )}
                          </div>

                          {proficiency !== null && (
                            <div className="skill-proficiency">
                              <div className="proficiency-track" aria-hidden="true">
                                <div
                                  className="proficiency-fill"
                                  style={{ width: `${proficiency}%` }}
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
