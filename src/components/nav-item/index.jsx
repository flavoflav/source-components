import { Children, useState } from 'react';
import { cn } from 'drupal-canvas';

const NavItem = ({ label, url, active = false, panel, className }) => {
  const [open, setOpen] = useState(false);
  // A declared-but-empty slot still arrives as a truthy value, so testing the
  // slot itself renders a chevron and an empty dropdown. Count the children.
  const hasPanel = Children.count(panel) > 0;

  if (!label) {
    return null;
  }

  return (
    <li
      className={cn('relative list-none', className)}
      onMouseEnter={hasPanel ? () => setOpen(true) : undefined}
      onMouseLeave={hasPanel ? () => setOpen(false) : undefined}
    >
      <div className="flex items-center gap-1">
        <a
          href={url || '/'}
          aria-current={active ? 'page' : undefined}
          className={cn(
            'py-2 text-sm font-medium hover:underline',
            active && 'underline underline-offset-4',
          )}
        >
          {label}
        </a>
        {hasPanel && (
          <button
            type="button"
            aria-expanded={open}
            aria-label={`Toggle ${label} menu`}
            onClick={() => setOpen((value) => !value)}
            className="p-1"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={cn(
                'h-3 w-3 transition-transform',
                open && 'rotate-180',
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 8l7 7 7-7" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {hasPanel && open && (
        <div className="z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white p-4 text-gray-900 shadow-lg lg:absolute lg:top-full lg:left-0 lg:mt-0 lg:w-max lg:min-w-64">
          {panel}
        </div>
      )}
    </li>
  );
};

export default NavItem;
