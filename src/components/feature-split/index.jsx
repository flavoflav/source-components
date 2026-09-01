import { Children } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
};

const FeatureSplit = ({
  eyebrow,
  title,
  body,
  image,
  videoUrl,
  mediaPosition = 'end',
  background = 'none',
  actions,
  className,
}) => (
  <section className={cn('w-full py-16', backgrounds[background], className)}>
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
      <div
        className={cn(
          'flex flex-col gap-4',
          mediaPosition === 'start' ? 'md:order-2' : 'md:order-1',
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
        {body && (
          <FormattedText className="text-lg leading-relaxed opacity-80 [&_li]:mb-2 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5">
            {body}
          </FormattedText>
        )}
        {Children.count(actions) > 0 && (
          <div className="mt-2 flex flex-wrap gap-4">{actions}</div>
        )}
      </div>
      <div
        className={cn(mediaPosition === 'start' ? 'md:order-1' : 'md:order-2')}
      >
        {videoUrl ? (
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              src={videoUrl}
              title={title || 'Feature video'}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          image?.src && (
            <img
              src={image.src}
              alt={image.alt || ''}
              width={image.width}
              height={image.height}
              className="w-full rounded-xl object-cover"
            />
          )
        )}
      </div>
    </div>
  </section>
);

export default FeatureSplit;
