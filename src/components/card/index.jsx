import { Children } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const variants = {
  plain: 'bg-transparent',
  bordered: 'border border-gray-200 bg-white',
  elevated: 'bg-white shadow-md',
  filled: 'bg-gray-50',
  dark: 'bg-gray-900 text-white',
};

const CardShell = ({ url, className, children }) =>
  url ? (
    <a href={url} className={className}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );

const Card = ({
  image,
  eyebrow,
  title,
  body,
  url,
  linkLabel,
  variant = 'bordered',
  horizontal = false,
  actions,
  className,
}) => (
  <CardShell
    url={url}
    className={cn(
      'group flex h-full overflow-hidden rounded-xl transition-shadow',
      horizontal ? 'flex-col sm:flex-row' : 'flex-col',
      variants[variant],
      url && 'hover:shadow-lg',
      className,
    )}
  >
    {image?.src && (
      <img
        src={image.src}
        alt={image.alt || ''}
        width={image.width}
        height={image.height}
        className={cn(
          'object-cover',
          horizontal ? 'sm:w-2/5' : 'aspect-[3/2] w-full',
        )}
      />
    )}
    <div className="flex flex-1 flex-col gap-3 p-6">
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest uppercase opacity-60">
          {eyebrow}
        </p>
      )}
      {title && (
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      )}
      {body && (
        <FormattedText className="text-sm leading-relaxed opacity-80 [&_p]:mb-2 [&_p:last-child]:mb-0">
          {body}
        </FormattedText>
      )}
      {Children.count(actions) > 0 && (
        <div className="mt-auto flex flex-wrap gap-3 pt-2">{actions}</div>
      )}
      {Children.count(actions) === 0 && linkLabel && (
        <span className="mt-auto pt-2 text-sm font-semibold underline underline-offset-4 group-hover:no-underline">
          {linkLabel}
        </span>
      )}
    </div>
  </CardShell>
);

export default Card;
