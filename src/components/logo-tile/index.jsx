import { cn } from 'drupal-canvas';

const heights = {
  small: 'max-h-8',
  medium: 'max-h-10',
  large: 'max-h-14',
};

const LogoTile = ({ logo, url, height = 'medium', className }) => {
  if (!logo?.src) {
    return null;
  }

  const mark = (
    <img
      src={logo.src}
      alt={logo.alt || ''}
      width={logo.width}
      height={logo.height}
      className={cn('w-auto object-contain', heights[height])}
    />
  );

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {url ? (
        <a href={url} className="inline-flex">
          {mark}
        </a>
      ) : (
        mark
      )}
    </div>
  );
};

export default LogoTile;
