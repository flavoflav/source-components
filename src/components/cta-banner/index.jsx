import { Children } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
  outline: 'border border-gray-200 bg-white text-gray-900',
};

const CtaBanner = ({
  eyebrow,
  title,
  body,
  backgroundImage,
  background = 'primary',
  layout = 'centered',
  actions,
  className,
}) => {
  const hasImage = Boolean(backgroundImage?.src);

  return (
    <section className={cn('w-full py-16', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl px-8 py-14 md:px-14',
            hasImage ? 'bg-gray-900 text-white' : backgrounds[background],
            layout === 'inline'
              ? 'flex flex-col gap-8 md:flex-row md:items-center md:justify-between'
              : 'flex flex-col items-center gap-6 text-center',
          )}
        >
          {hasImage && (
            <>
              <img
                src={backgroundImage.src}
                alt={backgroundImage.alt || ''}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-900/70" />
            </>
          )}
          <div
            className={cn(
              'relative flex flex-col gap-3',
              layout === 'centered' ? 'max-w-2xl items-center' : 'max-w-2xl',
            )}
          >
            {eyebrow && (
              <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                {title}
              </h2>
            )}
            {body && (
              <FormattedText className="text-lg leading-relaxed opacity-85 [&_p]:mb-3 [&_p:last-child]:mb-0">
                {body}
              </FormattedText>
            )}
          </div>
          {Children.count(actions) > 0 && (
            <div
              className={cn(
                'relative flex flex-wrap gap-4',
                layout === 'centered' ? 'justify-center' : 'shrink-0',
              )}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
