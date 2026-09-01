import { useState } from 'react';
import { cn } from 'drupal-canvas';

const tones = {
  primary: 'bg-primary-700 text-white',
  dark: 'bg-gray-900 text-white',
  light: 'bg-gray-100 text-gray-900',
};

const AnnouncementBar = ({
  message,
  linkLabel,
  linkUrl,
  tone = 'primary',
  dismissible = true,
  className,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) {
    return null;
  }

  return (
    <div className={cn('w-full', tones[tone], className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 py-2.5 text-sm">
        <p className="text-center">
          {message}
          {linkLabel && (
            <a
              href={linkUrl || '/'}
              className="ml-2 font-semibold underline underline-offset-4 hover:no-underline"
            >
              {linkLabel}
            </a>
          )}
        </p>
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setVisible(false)}
            className="ml-auto shrink-0 p-1 opacity-70 hover:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBar;
