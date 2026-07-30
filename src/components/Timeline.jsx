import timelineData from '../data/timeline.json';

export default function Timeline() {
  return (
    <div className="timeline-container">
      <div className="timeline-track-line" />

      {timelineData.map((item, idx) => (
        <div
          key={item.title}
          className="timeline-item scroll-reveal"
          style={{ transitionDelay: `${idx * 120}ms` }}
        >
          {/* Node Dot */}
          <div className="timeline-node-dot" />

          {/* Header Row */}
          <div className="timeline-header">
            <span className="timeline-period mono-text">{item.period}</span>
            <span className="tech-pill mono-text" style={{ marginLeft: 'auto' }}>
              {item.tag}
            </span>
          </div>

          {/* Title */}
          <h3 className="timeline-title">{item.title}</h3>

          {/* Description */}
          <p className="timeline-desc">{item.description}</p>

          {/* Code Signature & Benchmark Highlight */}
          <div className="timeline-technical mono-text">
            {item.signature && (
              <div className="code-block-signature">{item.signature}</div>
            )}
            {item.highlight && (
              <div className="timeline-highlight">
                <span style={{ color: 'var(--accent)' }}>// </span>
                {item.highlight}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
