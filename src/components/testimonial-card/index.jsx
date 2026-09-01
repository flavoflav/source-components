import { cn, FormattedText } from 'drupal-canvas';

const variants = {
  plain: '',
  bordered: 'rounded-xl border border-current/15 p-8',
  filled: 'rounded-xl bg-white p-8 shadow-sm',
  dark: 'rounded-xl bg-gray-900 p-8 text-white',
};

const TestimonialCard = ({
  quote,
  authorName,
  authorTitle,
  authorImage,
  companyLogo,
  variant = 'bordered',
  size = 'medium',
  className,
}) => {
  if (!quote) {
    return null;
  }

  return (
    <figure
      className={cn('flex h-full flex-col gap-6', variants[variant], className)}
    >
      {companyLogo?.src && (
        <img
          src={companyLogo.src}
          alt={companyLogo.alt || ''}
          width={companyLogo.width}
          height={companyLogo.height}
          className="max-h-8 w-auto self-start object-contain opacity-80"
        />
      )}
      <blockquote
        className={cn(
          'leading-relaxed text-pretty',
          size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg',
        )}
      >
        <FormattedText>{quote}</FormattedText>
      </blockquote>
      {(authorName || authorTitle) && (
        <figcaption className="mt-auto flex items-center gap-3">
          {authorImage?.src && (
            <img
              src={authorImage.src}
              alt={authorImage.alt || ''}
              width={authorImage.width}
              height={authorImage.height}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}
          <span>
            {authorName && (
              <span className="block font-semibold">{authorName}</span>
            )}
            {authorTitle && (
              <span className="block text-sm opacity-70">{authorTitle}</span>
            )}
          </span>
        </figcaption>
      )}
    </figure>
  );
};

export default TestimonialCard;
