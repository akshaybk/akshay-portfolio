import Reveal from "./Reveal";

function Projects({ projects }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    return (
      (a.display_order ?? 0) -
      (b.display_order ?? 0)
    );
  });

  const featuredProjects = sortedProjects.filter(
    (project) => project.featured
  );

  const otherProjects = sortedProjects.filter(
    (project) => !project.featured
  );

  return (
    <section id="projects" className="section">
      <div className="section-container">
        <Reveal>
          <div className="projects-heading">
            <p className="section-label">WORK</p>

            <h2>Selected Projects</h2>

            <p className="section-intro">
              A selection of things I've built and worked on.
            </p>
          </div>
        </Reveal>

        {featuredProjects.length > 0 && (
          <div className="featured-projects">
            {featuredProjects.map((project, index) => (
              <Reveal
                key={project.id}
                delay={index * 0.1}
              >
                <ProjectCard
                  project={project}
                  featured
                />
              </Reveal>
            ))}
          </div>
        )}

        {otherProjects.length > 0 && (
          <div className="projects-grid">
            {otherProjects.map((project, index) => (
              <Reveal
                key={project.id}
                delay={index * 0.08}
              >
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, featured = false }) {
  const title = project.title || "Untitled Project";

  return (
    <article
      className={`project-card ${
        featured ? "project-card-featured" : ""
      }`}
    >
      {project.image_url && (
        <div className="project-image-wrapper">
          <img
            src={project.image_url}
            alt={`${title} preview`}
            className="project-image"
            loading="lazy"
          />

          {project.featured && (
            <span className="featured-badge">
              Featured
            </span>
          )}
        </div>
      )}

      <div className="project-content">
        <div className="project-header">
          <div>
            {project.slug && (
              <p className="project-slug">
                /{project.slug}
              </p>
            )}

            <h3>{title}</h3>
          </div>

          {(project.github_url || project.live_url) && (
            <div className="project-links">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} GitHub repository`}
                >
                  GitHub
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} live demo`}
                >
                  Live
                </a>
              )}
            </div>
          )}
        </div>

        {project.short_description && (
          <p className="project-description">
            {project.short_description}
          </p>
        )}

        {project.technologies?.length > 0 && (
          <div className="technologies">
            {project.technologies.map((technology) => (
              <span key={technology}>
                {technology}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default Projects;