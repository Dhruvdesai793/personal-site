import papersData from '../data/papers.json';

export default function Papers() {
  const isEmpty = !papersData || papersData.length === 0;

  return (
    <div className="log-section scroll-reveal">
      {isEmpty ? (
        <div className="empty-state mono-text">
          <span>// nothing logged yet</span>
        </div>
      ) : (
        <div className="log-list">
          {papersData.map((paper, idx) => (
            <div key={idx} className="log-row">
              <div className="log-main">
                <a 
                  href={paper.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="log-title draw-link"
                >
                  {paper.title}
                </a>
                <span className="log-subtitle"> — {paper.authors || paper.venue}</span>
                {paper.note && <p className="log-note">{paper.note}</p>}
              </div>
              {paper.tags && paper.tags.length > 0 && (
                <div className="log-tags mono-text">
                  {paper.tags.map(tag => (
                    <span key={tag} className="tag">{`[${tag}]`}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
