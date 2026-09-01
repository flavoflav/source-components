import { useEffect, useState } from 'react';
import { cn } from 'drupal-canvas';

const STORAGE_KEY = 'canvas-theme';

const readStored = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    // Private browsing and blocked site data both throw here.
    return null;
  }
};

// Resolved once, lazily, so the first paint already matches the stored choice
// rather than being corrected by an effect afterwards.
const initialTheme = (defaultTheme) => {
  if (typeof document === 'undefined') {
    return defaultTheme === 'light' ? 'light' : 'dark';
  }
  const stored = readStored();
  if (stored) {
    return stored;
  }
  if (defaultTheme === 'system') {
    return window.matchMedia?.('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
  return defaultTheme === 'light' ? 'light' : 'dark';
};

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="4" />
    <path
      d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z" strokeLinejoin="round" />
  </svg>
);

const ThemeSwitch = ({
  defaultTheme = 'dark',
  variant = 'icon',
  lightLabel = 'Light',
  darkLabel = 'Dark',
  className,
}) => {
  const [theme, setTheme] = useState(() => initialTheme(defaultTheme));

  // Applies the choice to <html>; the palette in global.css does the rest.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Preference simply will not persist; the switch still works.
    }
  }, [theme]);

  const isDark = theme === 'dark';
  const next = isDark ? 'light' : 'dark';

  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-md border border-gray-300 p-0.5',
          className,
        )}
      >
        {[
          ['light', lightLabel, SunIcon],
          ['dark', darkLabel, MoonIcon],
        ].map(([value, label, Icon]) => (
          <button
            key={value}
            type="button"
            aria-pressed={theme === value}
            onClick={() => setTheme(value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium',
              theme === value
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900',
            )}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next === 'dark' ? darkLabel : lightLabel} theme`}
      title={`Switch to ${next === 'dark' ? darkLabel : lightLabel} theme`}
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-gray-300 px-2.5 py-2 text-sm text-gray-700 hover:border-primary-500 hover:text-primary-700',
        className,
      )}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      {variant === 'icon_label' && (
        <span>{isDark ? darkLabel : lightLabel}</span>
      )}
    </button>
  );
};

export default ThemeSwitch;
