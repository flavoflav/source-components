import { cn } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
};

const columns = {
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
  6: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6',
};

const LogoWall = ({
  title,
  columnCount = 5,
  background = 'none',
  grayscale = true,
  logos,
  className,
}) => (
  <section className={cn('w-full py-14', backgrounds[background], className)}>
    <div className="mx-auto max-w-7xl px-6">
      {title && (
        <p className="mb-10 text-center text-sm font-semibold tracking-widest uppercase opacity-60">
          {title}
        </p>
      )}
      <div
        className={cn(
          'grid items-center gap-x-10 gap-y-8',
          columns[columnCount] || columns[5],
          grayscale && 'opacity-70 grayscale',
        )}
      >
        {logos}
      </div>
    </div>
  </section>
);

export default LogoWall;
