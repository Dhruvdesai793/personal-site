'use client';
import { useEffect, useState } from 'react';

const THEMES = [
  { id: 'claude', name: 'claude warm' },
  { id: 'cuda', name: 'cuda amber' },
  { id: 'indigo', name: 'deepmind' },
  { id: 'monochrome', name: 'monochrome' }
];

export default function ThemeToggle() {
  const [activeTheme, setActiveTheme] = useState('claude');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dhruv_theme');
    if (saved && THEMES.some(t => t.id === saved)) {
      setActiveTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const handleSelect = (themeId) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('dhruv_theme', themeId);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link mono-text theme-btn"
        style={{
          padding: '0.2rem 0.6rem',
          borderRadius: '4px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          color: 'var(--accent-cream)',
          fontSize: '0.75rem',
        }}
      >
        [theme: {activeTheme}]
      </button>

      {isOpen && (
        <div
          className="mono-text"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.4rem)',
            right: 0,
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '0.4rem',
            zIndex: 100,
            minWidth: '130px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        >
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '0.35rem 0.6rem',
                border: 'none',
                background: 'none',
                color: activeTheme === theme.id ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                borderRadius: '4px',
                fontWeight: activeTheme === theme.id ? 600 : 400
              }}
            >
              {theme.id === activeTheme ? '› ' : '  '}{theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
