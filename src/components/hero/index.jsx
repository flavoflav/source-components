import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
};

const heights = {
  auto: 'py-20',
  medium: 'py-24 md:py-32',
  tall: 'py-32 md:py-48',
};

const HeroMedia = ({ videoUrl, image, title }) => {
  if (videoUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={videoUrl}
          title={title || 'Hero video'}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (image?.src) {
    return (
      <img
        src={image.src}
        alt={image.alt || ''}
        width={image.width}
        height={image.height}
        className="w-full rounded-xl object-cover"
      />
    );
  }

  return null;
};

const Hero = ({
  eyebrow,
  title,
  body,
  image,
  videoUrl,
  backgroundImage,
  layout = 'centered',
  background = 'light',
  height = 'medium',
  actions,
  className,
}) => {
  const hasBackdrop = layout === 'backdrop' && backgroundImage?.src;

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        hasBackdrop ? 'bg-gray-900 text-white' : backgrounds[background],
        className,
      )}
    >
      {hasBackdrop && (
        <>
          <img
            src={backgroundImage.src}
            alt={backgroundImage.alt || ''}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </>
      )}

      <div
        className={cn(
          'relative mx-auto max-w-7xl px-6',
          heights[height],
          layout === 'split'
            ? 'grid grid-cols-1 items-center gap-12 md:grid-cols-2'
            : '',
        )}
      >
        <div
          className={cn(
            'flex flex-col gap-6',
            layout === 'split'
              ? 'items-start text-left'
              : 'mx-auto max-w-3xl items-center text-center',
          )}
        >
          {eyebrow && (
            <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
              {eyebrow}
            </p>
          )}
          {title && (
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              {title}
            </h1>
          )}
          {body && (
            <FormattedText className="text-lg leading-relaxed opacity-85 md:text-xl [&_p]:mb-4 [&_p:last-child]:mb-0">
              {body}
            </FormattedText>
          )}
          {actions && (
            <div
              className={cn(
                'mt-2 flex flex-wrap gap-4',
                layout === 'split' ? 'justify-start' : 'justify-center',
              )}
            >
              {actions}
            </div>
          )}
        </div>

        {layout === 'split' && (
          <HeroMedia videoUrl={videoUrl} image={image} title={title} />
        )}
      </div>
    </section>
  );
};

export default Hero;
