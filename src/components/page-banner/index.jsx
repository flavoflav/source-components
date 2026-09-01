import { Children } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
};

const aligns = {
  left: 'text-left items-start',
  center: 'text-center items-center mx-auto',
};

const PageBanner = ({
  eyebrow,
  title,
  intro,
  backgroundImage,
  background = 'light',
  align = 'left',
  breadcrumb,
  className,
}) => {
  const hasImage = Boolean(backgroundImage?.src);

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        hasImage ? 'bg-gray-900 text-white' : backgrounds[background],
        className,
      )}
    >
      {hasImage && (
        <>
          <img
            src={backgroundImage.src}
            alt={backgroundImage.alt || ''}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/65" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20">
        {Children.count(breadcrumb) > 0 && (
          <div className="mb-6">{breadcrumb}</div>
        )}
        <div className={cn('flex max-w-3xl flex-col gap-3', aligns[align])}>
          {eyebrow && (
            <p className="text-sm font-semibold tracking-widest uppercase opacity-75">
              {eyebrow}
            </p>
          )}
          {title && (
            <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              {title}
            </h1>
          )}
          {intro && (
            <FormattedText className="text-lg leading-relaxed opacity-85 [&_p]:mb-3 [&_p:last-child]:mb-0">
              {intro}
            </FormattedText>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
