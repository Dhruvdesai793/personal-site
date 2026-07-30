import socialsData from '../data/socials.json';

export default function Footer() {
  return (
    <footer className="footer scroll-reveal">
      <div className="footer-line" />
      <div className="footer-content">
        <span className="footer-copyright mono-text">
          © {new Date().getFullYear()} · Dhruv Desai
        </span>
        <div className="social-links">
          {socialsData.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label={social.platform}
            >
              <svg 
                viewBox="0 0 24 24" 
                className="social-icon" 
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={social.svgPath} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
