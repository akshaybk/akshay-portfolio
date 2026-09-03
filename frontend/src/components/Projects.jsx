import { useState } from "react";
import Reveal from "./Reveal";

function Projects({ projects }) {
  if (!projects || projects.length === 0) return null;

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (a.display_order ?? 0) - (b.display_order ?? 0);
  });

  return (
    <section id="projects" className="section projects-showcase" aria-labelledby="projects-title">
      <div className="section-container">
        <Reveal>
          <div className="projects-heading projects-showcase-heading">
            <p className="section-label">FEATURED WORK</p>
            <h2 id="projects-title">Selected Projects</h2>
            <p className="section-intro">A selection of things I've built and worked on.</p>
          </div>
        </Reveal>

        <div className="projects-grid projects-showcase-grid">
          {sortedProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const title = project.title || "Untitled Project";
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];
  const [imageFailed, setImageFailed] = useState(false);

  const showImage = Boolean(project.image_url) && !imageFailed;

  return (
    <article className="project-card project-showcase-card">
      <div className="project-showcase-copy">
        <div className="project-header">
          <div>
            {project.slug && <p className="project-slug">/{project.slug}</p>}
            <h3>{title}</h3>
          </div>
        </div>

        {project.short_description && <p className="project-description">{project.short_description}</p>}

        {technologies.length > 0 && (
          <div className="technologies project-technologies" aria-label="Technologies used">
            {technologies.map((technology, index) => (
              <span key={`${technology}-${index}`}>{technology}</span>
            ))}
          </div>
        )}

        {(project.github_url || project.live_url) && (
          <div className="project-links project-showcase-links" aria-label={`${title} links`}>
            {project.github_url && (
              <a className="project-primary-link" href={project.github_url} target="_blank" rel="noopener noreferrer" aria-label={`${title} GitHub repository`}>
                GitHub
              </a>
            )}
            {project.live_url && (
              <a className="project-secondary-link" href={project.live_url} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}>
                Live Demo <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </div>

      <div className="project-showcase-media" aria-label={showImage ? `${title} project preview` : `${title} project preview unavailable`}>
        {showImage ? (
          <img
            src={project.image_url}
            alt={`${title} project preview`}
            className="project-image"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="project-media-placeholder" role="img" aria-label={`${title} project preview unavailable`}>
            <span>{title}</span>
            <span className="project-media-placeholder-mark" aria-hidden="true">&lt;/&gt;</span>
            {project.image_url && <span>Preview unavailable</span>}
          </div>
        )}
      </div>
    </article>
  );
}

export default Projects;
