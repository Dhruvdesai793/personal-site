export default function ContributionGraph({ username = "Dhruvdesai793" }) {
  return (
    <div className="contribution-chart-card card">
      <div className="contribution-header mono-text">
        <span>// github contribution heatmap · {username}</span>
      </div>
      <div className="contribution-img-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt={`${username}'s GitHub contribution chart`}
          className="contribution-img"
        />
      </div>
    </div>
  );
}
