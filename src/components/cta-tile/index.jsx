import { cn, FormattedText } from 'drupal-canvas';

const tones = {
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
  outline: 'border border-gray-200 bg-white text-gray-900',
};

const CtaTile = ({
  icon,
  title,
  body,
  linkLabel,
  url,
  tone = 'light',
  backgroundImage,
  className,
}) => {
  const hasImage = Boolean(backgroundImage?.src);

  return (
    <a
      href={url || '/'}
      className={cn(
        'group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl p-8 transition-shadow hover:shadow-lg',
        hasImage ? 'bg-gray-900 text-white' : tones[tone],
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
          <div className="absolute inset-0 bg-gray-900/65 transition-colors group-hover:bg-gray-900/75" />
        </>
      )}
      <div className="relative flex h-full flex-col gap-3">
        {icon?.src && (
          <img
            src={icon.src}
            alt={icon.alt || ''}
            width={icon.width}
            height={icon.height}
            className="mb-1 h-10 w-10 object-contain"
          />
        )}
        {title && <h3 className="text-xl font-semibold">{title}</h3>}
        {body && (
          <FormattedText className="text-sm leading-relaxed opacity-80">
            {body}
          </FormattedText>
        )}
        {linkLabel && (
          <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold">
            {linkLabel}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    </a>
  );
};

export default CtaTile;
