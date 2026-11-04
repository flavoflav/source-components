import { Children, useEffect, useId, useRef, useState } from 'react';
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
  const menuId = useId();
  const menuRef = useRef(null);

  // Close the mobile menu after following a link or pressing Escape. The
  // listeners are attached imperatively because the slot content is rendered
  // by other components.
  useEffect(() => {
    const menu = menuRef.current;
    if (!open || !menu) {
      return undefined;
    }
    const onClick = (event) => {
      if (event.target instanceof Element && event.target.closest('a[href]')) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    menu.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      menu.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'z-40 w-full border-b',
        sticky && 'sticky top-0',
        variants[variant],
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 px-6 py-4">
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

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          aria-controls={menuId}
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

        {/* One copy of the slots: stacked and collapsible below lg, inline from
            lg up. Rendering them twice duplicated the nav landmark and state. */}
        <div
          ref={menuRef}
          id={menuId}
          className={cn(
            'mt-4 w-full flex-col gap-6 border-t border-current/15 pt-6',
            open ? 'flex' : 'hidden',
            'lg:mt-0 lg:flex lg:w-auto lg:flex-1 lg:flex-row lg:items-center lg:justify-end lg:gap-8 lg:border-0 lg:pt-0',
          )}
        >
          {navigation}
          {Children.count(actions) > 0 && (
            <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
