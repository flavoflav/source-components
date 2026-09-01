import { Children, cloneElement, isValidElement } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
};

const StepList = ({
  title,
  intro,
  layout = 'vertical',
  numbered = true,
  background = 'none',
  steps,
  className,
}) => (
  <section className={cn('w-full py-16', backgrounds[background], className)}>
    <div className="mx-auto max-w-5xl px-6">
      {(title || intro) && (
        <div className="mb-12 flex flex-col gap-3">
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
          )}
          {intro && (
            <FormattedText className="max-w-2xl text-lg leading-relaxed opacity-80">
              {intro}
            </FormattedText>
          )}
        </div>
      )}
      <ol
        className={cn(
          layout === 'horizontal'
            ? 'grid grid-cols-1 gap-10 md:grid-cols-3'
            : 'flex flex-col gap-10',
        )}
      >
        {Children.map(steps, (step, i) =>
          isValidElement(step)
            ? cloneElement(step, { index: numbered ? i + 1 : null })
            : step,
        )}
      </ol>
    </div>
  </section>
);

export default StepList;
