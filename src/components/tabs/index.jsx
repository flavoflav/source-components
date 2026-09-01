import { Children, useState } from 'react';
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
  const [active, setActive] = useState(0);
  const items = Children.toArray(panels);

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
              type="button"
              role="tab"
              aria-selected={active === i}
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

        <div role="tabpanel">{items[active]}</div>
      </div>
    </section>
  );
};

export default Tabs;
