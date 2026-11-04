import { Children, useId, useRef, useState } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
};

const Tabs = ({
  title,
  intro,
  background = 'none',
  align = 'center',
  panels,
  className,
}) => {
  const [requested, setActive] = useState(0);
  const items = Children.toArray(panels);
  const baseId = useId();
  const tabRefs = useRef([]);
  // Clamp so removing panels never leaves a stale index selecting nothing.
  const active = Math.min(requested, Math.max(0, items.length - 1));

  const onKeyDown = (event) => {
    const last = items.length - 1;
    const keys = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in keys)) {
      return;
    }
    event.preventDefault();
    setActive(keys[event.key]);
    tabRefs.current[keys[event.key]]?.focus();
  };

  return (
    <section className={cn('w-full py-16', backgrounds[background], className)}>
      <div className="mx-auto max-w-7xl px-6">
        {(title || intro) && (
          <div
            className={cn(
              'mb-10 flex max-w-3xl flex-col gap-3',
              align === 'center' && 'mx-auto text-center',
            )}
          >
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <FormattedText className="text-lg leading-relaxed opacity-80">
                {intro}
              </FormattedText>
            )}
          </div>
        )}

        <div
          role="tablist"
          className={cn(
            'mb-10 flex flex-wrap gap-2 border-b border-current/15',
            align === 'center' ? 'justify-center' : 'justify-start',
          )}
        >
          {items.map((panel, i) => (
            <button
              key={i}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              onKeyDown={onKeyDown}
              aria-selected={active === i}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                '-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition-colors',
                active === i
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              {panel?.props?.label || `Tab ${i + 1}`}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-${active}`}
          aria-labelledby={`${baseId}-tab-${active}`}
          tabIndex={0}
        >
          {items[active]}
        </div>
      </div>
    </section>
  );
};

export default Tabs;
