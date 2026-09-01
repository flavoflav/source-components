import { cn, FormattedText } from 'drupal-canvas';

const ProductCard = ({
  name,
  image,
  price,
  compareAtPrice,
  description,
  badgeLabel,
  url,
  ctaLabel,
  variant = 'plain',
  className,
}) => {
  if (!name) {
    return null;
  }

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden',
        variant === 'bordered' && 'rounded-xl border border-gray-200',
        variant === 'elevated' && 'rounded-xl bg-white shadow-md',
        className,
      )}
    >
      {badgeLabel && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
          {badgeLabel}
        </span>
      )}
      {image?.src && (
        <a href={url || '/'} className="block overflow-hidden bg-gray-50">
          <img
            src={image.src}
            alt={image.alt || ''}
            width={image.width}
            height={image.height}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>
      )}
      <div
        className={cn(
          'flex flex-1 flex-col gap-2',
          variant === 'plain' ? 'pt-4' : 'p-5',
        )}
      >
        <h3 className="font-semibold">
          <a href={url || '/'} className="hover:underline">
            {name}
          </a>
        </h3>
        {description && (
          <FormattedText className="text-sm leading-relaxed opacity-70">
            {description}
          </FormattedText>
        )}
        {price && (
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-semibold">{price}</span>
            {compareAtPrice && (
              <span className="text-sm line-through opacity-50">
                {compareAtPrice}
              </span>
            )}
          </p>
        )}
        {ctaLabel && (
          <a
            href={url || '/'}
            className="mt-auto pt-3 text-sm font-semibold underline underline-offset-4 hover:no-underline"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
