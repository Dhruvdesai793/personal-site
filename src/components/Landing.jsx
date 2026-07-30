'use client';
import { useEffect, useState } from 'react';

export default function Landing({ onComplete }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Session storage check: run animation once per session
    const hasVisited = sessionStorage.getItem('visited_dhruv');
    if (hasVisited) {
      onComplete();
    } else {
      setShouldRender(true);
      // Synchronize completion callback with the 3.6s timeline
      const timer = setTimeout(() => {
        sessionStorage.setItem('visited_dhruv', 'true');
        onComplete();
      }, 3600);

      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div className="landing-overlay">
      <div className="landing-inner">
        <div className="landing-hardware-tag mono-text">
          [nvcc 12.4 · sm_90a · cudaContext::init()]
        </div>
        <h1 className="landing-title-text">Dhruv Desai</h1>
        <p className="landing-subtitle-text">
          Building ML Infrastructure & Deep Learning Systems from First Principles.
        </p>
        <div className="landing-memory-bar-track">
          <div className="landing-memory-bar-fill" />
        </div>
      </div>
    </div>
  );
}
