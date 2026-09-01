import { Children, useState } from 'react';
import { cn } from 'drupal-canvas';

const variants = {
  light: 'bg-white text-gray-900 border-gray-200',
  dark: 'bg-gray-900 text-white border-white/15',
  transparent: 'bg-transparent text-white border-white/20',
};

const SiteHeader = ({
  logo,
  logoUrl = '/',
  siteName,
  sticky = false,
  variant = 'light',
  navigation,
  actions,
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        'z-40 w-full border-b',
        sticky && 'sticky top-0',
        variants[variant],
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href={logoUrl} className="flex shrink-0 items-center gap-3">
          {logo?.src ? (
            <img
              src={logo.src}
              alt={logo.alt || siteName || 'Home'}
              width={logo.width}
              height={logo.height}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="text-lg font-semibold tracking-tight">
              {siteName}
            </span>
          )}
        </a>

        <div className="hidden flex-1 items-center justify-end gap-8 lg:flex">
          {navigation}
          {Children.count(actions) > 0 && (
            <div className="flex items-center gap-3">{actions}</div>
          )}
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-current/30 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-current/15 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-6">
            {navigation}
            {Children.count(actions) > 0 && (
              <div className="flex flex-wrap gap-3">{actions}</div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
