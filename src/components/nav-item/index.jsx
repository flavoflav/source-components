import { Children, useEffect, useRef, useState } from 'react';
import { cn } from 'drupal-canvas';

const NavItem = ({ label, url, active = false, panel, className }) => {
  const [open, setOpen] = useState(false);
  const itemRef = useRef(null);
  const toggleRef = useRef(null);
  // A declared-but-empty slot still arrives as a truthy value, so testing the
  // slot itself renders a chevron and an empty dropdown. Count the children.
  const hasPanel = Children.count(panel) > 0;

  // While open, close on an outside tap, on Escape, and when focus leaves.
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onPointerDown = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onFocusOut = (event) => {
      if (!itemRef.current?.contains(event.relatedTarget)) {
        setOpen(false);
      }
    };
    const item = itemRef.current;
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    item?.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      item?.removeEventListener('focusout', onFocusOut);
    };
  }, [open]);

  if (!label) {
    return null;
  }

  // Hover only applies to a real mouse. Touch taps also emit compatibility
  // mouse events, which opened the panel just before the click handler toggled
  // it shut again.
  const onPointerEnter = (event) => {
    if (event.pointerType === 'mouse') {
      setOpen(true);
    }
  };
  const onPointerLeave = (event) => {
    if (event.pointerType === 'mouse') {
      setOpen(false);
    }
  };

  return (
    <li
      ref={itemRef}
      className={cn('relative list-none', className)}
      onPointerEnter={hasPanel ? onPointerEnter : undefined}
      onPointerLeave={hasPanel ? onPointerLeave : undefined}
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
            ref={toggleRef}
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
