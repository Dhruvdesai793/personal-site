'use client';
import { useEffect, useState } from 'react';
import ContributionGraph from './ContributionGraph';

export default function CommitStream({ username = "Dhruvdesai793", limit = 6 }) {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        if (data.commits && data.commits.length > 0) {
          setCommits(data.commits.slice(0, limit));
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [limit]);

  return (
    <div className="commit-stream-container scroll-reveal">
      {/* Live Contribution Graph Chart */}
      <ContributionGraph username={username} />

      {/* Real Commits List */}
      <div className="commit-list-wrapper" style={{ marginTop: '2rem' }}>
        <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          <span>// recent public push events ({commits.length})</span>
        </div>

        {loading ? (
          <div className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1rem 0' }}>
            fetching real-time github telemetry...
          </div>
        ) : (
          <div className="commit-list">
            {commits.map((commit, idx) => (
              <a
                key={commit.sha + idx}
                href={commit.link}
                target="_blank"
                rel="noopener noreferrer"
                className="commit-item card"
              >
                <div className="commit-top-row mono-text">
                  <span className="commit-hash">{commit.sha}</span>
                  <span className="commit-repo">{commit.repo}</span>
                  <span className="commit-time">
                    {new Date(commit.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="commit-message">{commit.message}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
