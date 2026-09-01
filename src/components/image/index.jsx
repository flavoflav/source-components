import { cn } from 'drupal-canvas';

const ratios = {
  auto: '',
  square: 'aspect-square object-cover',
  landscape: 'aspect-[4/3] object-cover',
  wide: 'aspect-video object-cover',
  portrait: 'aspect-[3/4] object-cover',
};

const rounding = {
  none: 'rounded-none',
  small: 'rounded-md',
  medium: 'rounded-xl',
  full: 'rounded-full',
};

const Image = ({
  image,
  caption,
  ratio = 'auto',
  radius = 'medium',
  className,
}) => {
  if (!image?.src) {
    return null;
  }

  const { src, alt, width, height } = image;

  return (
    <figure className={cn('w-full', className)}>
      <img
        {...{ src, alt, width, height }}
        className={cn('w-full', ratios[ratio], rounding[radius])}
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
