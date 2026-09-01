import { Children } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
};

const columns = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

const aligns = {
  left: 'text-left items-start',
  center: 'text-center items-center',
};

const CardGrid = ({
  eyebrow,
  title,
  intro,
  columnCount = 3,
  align = 'center',
  background = 'none',
  items,
  actions,
  className,
}) => (
  <section className={cn('w-full py-16', backgrounds[background], className)}>
    <div className="mx-auto max-w-7xl px-6">
      {(eyebrow || title || intro) && (
        <div
          className={cn(
            'mb-12 flex max-w-3xl flex-col gap-4',
            aligns[align],
            align === 'center' && 'mx-auto',
          )}
        >
          {eyebrow && (
            <p className="text-sm font-semibold tracking-widest uppercase opacity-70">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {title}
            </h2>
          )}
          {intro && (
            <FormattedText className="text-lg leading-relaxed opacity-80 [&_p]:mb-3 [&_p:last-child]:mb-0">
              {intro}
            </FormattedText>
          )}
        </div>
      )}
      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          columns[columnCount] || columns[3],
        )}
      >
        {items}
      </div>
      {Children.count(actions) > 0 && (
        <div
          className={cn(
            'mt-12 flex flex-wrap gap-4',
            align === 'center' ? 'justify-center' : 'justify-start',
          )}
        >
          {actions}
        </div>
      )}
    </div>
  </section>
);

export default CardGrid;
