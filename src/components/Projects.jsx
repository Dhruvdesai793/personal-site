import projectsData from '../data/projects.json';

export default function Projects() {
  return (
    <div className="projects-grid">
      {projectsData.map((project, idx) => (
        <a
          key={project.title}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card project-card scroll-reveal"
          style={{ transitionDelay: `${idx * 100}ms` }}
        >
          <div className="project-header">
            <h3 className="project-title">
              {project.title}
              <span className="project-arrow">↗</span>
            </h3>
            <div className="project-meta mono-text">
              <span className="project-commit">{project.commit}</span>
              <span className="dot-separator">·</span>
              <span className="project-branch">{project.branch}</span>
            </div>
          </div>

          <p className="project-desc">{project.description}</p>

          <div className="tech-pills mono-text">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-technical-details mono-text">
            {project.signature && (
              <div className="code-block-signature">{project.signature}</div>
            )}
            <div className="project-footnotes">{project.footnotes}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
