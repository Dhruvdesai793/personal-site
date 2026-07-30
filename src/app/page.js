'use client';
import { useEffect, useState } from 'react';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Reading from '../components/Reading';
import Papers from '../components/Papers';
import Timeline from '../components/Timeline';
import CommitStream from '../components/CommitStream';
import Footer from '../components/Footer';
import AmbientBackground from '../components/AmbientBackground';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLandingComplete, setIsLandingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [transitioning, setTransitioning] = useState(false);

  // Set mounted status on client load & bind mouse spotlight tracking
  useEffect(() => {
    setMounted(true);
    const hasVisited = sessionStorage.getItem('visited_dhruv');
    if (hasVisited) {
      setIsLandingComplete(true);
    }

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // IntersectionObserver for scroll rise-and-fade transitions
  useEffect(() => {
    if (!isLandingComplete) return;

    const timeout = setTimeout(() => {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      revealElements.forEach((el) => observer.observe(el));

      return () => {
        revealElements.forEach((el) => observer.unobserve(el));
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [isLandingComplete, activeTab]);

  const handleLandingComplete = () => {
    setIsLandingComplete(true);
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTransitioning(false);
    }, 200);
  };

  if (!mounted) {
    return <div style={{ backgroundColor: 'var(--background, #141312)', minHeight: '100vh' }} />;
  }

  return (
    <>
      <AmbientBackground />
      <div className="mouse-spotlight" />

      {!isLandingComplete && (
        <Landing onComplete={handleLandingComplete} />
      )}

      <div 
        className={`main-wrapper ${isLandingComplete ? 'fade-in-content' : 'hidden-content'}`}
      >
        {/* Navigation Header */}
        <header className="nav-header">
          <div className="nav-logo mono-text">
            <div className="status-badge-inline">
              <span className="status-dot" />
              <span>dd · building infra</span>
            </div>
          </div>
          <nav className="nav-menu" style={{ alignItems: 'center' }}>
            <button
              onClick={() => handleTabChange('about')}
              className={`nav-link mono-text ${activeTab === 'about' ? 'active' : ''}`}
            >
              about
            </button>
            <button
              onClick={() => handleTabChange('projects')}
              className={`nav-link mono-text ${activeTab === 'projects' ? 'active' : ''}`}
            >
              projects
            </button>
            <button
              onClick={() => handleTabChange('commits')}
              className={`nav-link mono-text ${activeTab === 'commits' ? 'active' : ''}`}
            >
              commits
            </button>
            <button
              onClick={() => handleTabChange('timeline')}
              className={`nav-link mono-text ${activeTab === 'timeline' ? 'active' : ''}`}
            >
              timeline
            </button>
            <button
              onClick={() => handleTabChange('reading')}
              className={`nav-link mono-text ${activeTab === 'reading' ? 'active' : ''}`}
            >
              reading
            </button>
            <button
              onClick={() => handleTabChange('papers')}
              className={`nav-link mono-text ${activeTab === 'papers' ? 'active' : ''}`}
            >
              papers
            </button>
            <ThemeToggle />
          </nav>
        </header>

        {/* Content Area */}
        <main className={`content-area ${transitioning ? 'transition-out' : 'transition-in'}`}>
          {activeTab === 'about' && (
            <section className="about-section subpage-container">
              {/* Serene Quiet Hero */}
              <div className="split-hero">
                <div className="profile-info">
                  <h1 className="hero-name">Dhruv Desai</h1>
                  <p className="hero-tagline">
                    Building ML Infrastructure & Deep Learning Systems from First Principles.
                  </p>
                  
                  <div className="hero-manifesto-tags mono-text" style={{ marginTop: '1.25rem' }}>
                    <span className="tech-pill">[Systems]</span>
                    <span className="tech-pill">[CUDA]</span>
                    <span className="tech-pill">[PyTorch]</span>
                    <span className="tech-pill">[Embeddings]</span>
                  </div>
                </div>

                <div className="hero-right-col">
                  <div className="profile-photo-wrapper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/profile.png"
                      alt="Dhruv Desai"
                      className="profile-photo"
                    />
                  </div>
                </div>
              </div>

              {/* Quiet Identity Manifesto */}
              <div className="about-body">
                <p className="about-statement">
                  The craftsmanship of a systems programmer, the curiosity of a deep learning researcher, 
                  presented with the quiet confidence of someone who's spent late nights debugging CUDA 
                  kernels and reading embedding papers for fun.
                </p>
                
                <p className="about-details">
                  I focus on building performant, low-level execution backends for deep learning pipelines, 
                  optimizing distributed transformer runtimes, and representation learning architectures. 
                  This space is where algorithms meet hardware.
                </p>
              </div>
            </section>
          )}

          {activeTab === 'projects' && (
            <div className="subpage-container">
              <div className="section-intro">
                <h2 className="section-title">Projects</h2>
                <p className="section-desc">Selected open-source libraries and implementations.</p>
              </div>
              <Projects />
            </div>
          )}

          {activeTab === 'commits' && (
            <div className="subpage-container">
              <div className="section-intro">
                <h2 className="section-title">GitHub Activity Stream</h2>
                <p className="section-desc">Real-time GitHub contribution chart and server-cached push events.</p>
              </div>
              <CommitStream username="Dhruvdesai793" />
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="subpage-container">
              <div className="section-intro">
                <h2 className="section-title">Milestone Log</h2>
                <p className="section-desc">Major infrastructure, deep learning, and systems milestones.</p>
              </div>
              <Timeline />
            </div>
          )}

          {activeTab === 'reading' && (
            <div className="subpage-container">
              <div className="section-intro">
                <h2 className="section-title">Reading List</h2>
                <p className="section-desc">Books and literature currently reading or finished.</p>
              </div>
              <Reading />
            </div>
          )}

          {activeTab === 'papers' && (
            <div className="subpage-container">
              <div className="section-intro">
                <h2 className="section-title">Research Papers</h2>
                <p className="section-desc">Literature logs and reviews on architectures & systems.</p>
              </div>
              <Papers />
            </div>
          )}
        </main>

        {/* Footer Links */}
        <Footer />
      </div>
    </>
  );
}
