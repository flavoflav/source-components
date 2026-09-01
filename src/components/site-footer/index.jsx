import { cn } from 'drupal-canvas';

const variants = {
  dark: 'bg-gray-900 text-white',
  light: 'bg-gray-50 text-gray-900',
  white: 'bg-white text-gray-900 border-t border-gray-200',
};

const columns = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
};

const SiteFooter = ({
  logo,
  logoUrl = '/',
  siteName,
  tagline,
  copyright,
  columnCount = 4,
  variant = 'dark',
  linkColumns,
  social,
  legal,
  className,
}) => (
  <footer className={cn('w-full', variants[variant], className)}>
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-4">
          <a href={logoUrl} className="inline-flex items-center gap-3">
            {logo?.src ? (
              <img
                src={logo.src}
                alt={logo.alt || siteName || 'Home'}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="text-lg font-semibold tracking-tight">
                {siteName}
              </span>
            )}
          </a>
          {tagline && (
            <p className="max-w-sm text-sm leading-relaxed opacity-75">
              {tagline}
            </p>
          )}
          {social && <div className="mt-2">{social}</div>}
        </div>

        <div
          className={cn(
            'grid grid-cols-2 gap-8',
            columns[columnCount] || columns[4],
          )}
        >
          {linkColumns}
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-current/15 pt-8 text-sm opacity-70 md:flex-row md:items-center md:justify-between">
        {copyright && <p>{copyright}</p>}
        {legal && <div className="flex flex-wrap gap-x-6 gap-y-2">{legal}</div>}
      </div>
    </div>
  </footer>
);

export default SiteFooter;
