'use client';
import { useEffect, useState } from 'react';

export default function Landing({ onComplete }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Session check to run animation only once per session
    const hasVisited = sessionStorage.getItem('visited_dhruv');
    if (hasVisited) {
      onComplete();
    } else {
      setShouldRender(true);
      // Synchronize completion with the 3.4s CSS timeline
      const timer = setTimeout(() => {
        sessionStorage.setItem('visited_dhruv', 'true');
        onComplete();
      }, 3400);

      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div className="landing-overlay">
      <div className="landing-inner">
        <div className="landing-cursor-standalone" />
        <h1 className="landing-title-text">Dhruv Desai</h1>
        <p className="landing-subtitle-text">
          Building ML Infrastructure & Deep Learning Systems from First Principles.
        </p>
      </div>
    </div>
  );
}
