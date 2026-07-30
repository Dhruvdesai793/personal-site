import readingData from '../data/reading.json';

export default function Reading() {
  const isEmpty = !readingData || readingData.length === 0;

  return (
    <div className="log-section scroll-reveal">
      {isEmpty ? (
        <div className="empty-state mono-text">
          <span>// nothing logged yet</span>
        </div>
      ) : (
        <div className="log-list">
          {readingData.map((item, idx) => (
            <div key={idx} className="log-row">
              <div className="log-main">
                <span className="log-title">{item.title}</span>
                <span className="log-subtitle"> by {item.author}</span>
                {item.note && <p className="log-note">{item.note}</p>}
              </div>
              {item.status && (
                <span className={`status-badge mono-text ${item.status}`}>
                  {item.status}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
