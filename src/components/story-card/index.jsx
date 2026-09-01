import { cn, FormattedText } from 'drupal-canvas';

const variants = {
  plain: '',
  bordered: 'rounded-xl border border-gray-200 overflow-hidden',
  elevated: 'rounded-xl bg-white shadow-md overflow-hidden',
  dark: 'rounded-xl bg-gray-900 text-white overflow-hidden',
};

const StoryCard = ({
  customerName,
  logo,
  image,
  headline,
  summary,
  statValue,
  statLabel,
  url,
  linkLabel = 'Read the story',
  variant = 'bordered',
  className,
}) => (
  <article
    className={cn('group flex h-full flex-col', variants[variant], className)}
  >
    {image?.src && (
      <img
        src={image.src}
        alt={image.alt || ''}
        width={image.width}
        height={image.height}
        className="aspect-[3/2] w-full object-cover"
      />
    )}
    <div
      className={cn(
        'flex flex-1 flex-col gap-4',
        variant === 'plain' ? 'pt-5' : 'p-6',
      )}
    >
      {logo?.src ? (
        <img
          src={logo.src}
          alt={logo.alt || customerName || ''}
          width={logo.width}
          height={logo.height}
          className="max-h-7 w-auto self-start object-contain opacity-80"
        />
      ) : (
        customerName && (
          <p className="text-xs font-semibold tracking-widest uppercase opacity-60">
            {customerName}
          </p>
        )
      )}
      {headline && (
        <h3 className="text-lg leading-snug font-semibold">
          <a href={url || '/'} className="hover:underline">
            {headline}
          </a>
        </h3>
      )}
      {summary && (
        <FormattedText className="text-sm leading-relaxed opacity-75">
          {summary}
        </FormattedText>
      )}
      {statValue && (
        <p className="mt-2">
          <span className="block text-3xl font-semibold tracking-tight tabular-nums">
            {statValue}
          </span>
          {statLabel && (
            <span className="block text-sm opacity-70">{statLabel}</span>
          )}
        </p>
      )}
      {url && (
        <a
          href={url}
          className="mt-auto pt-3 text-sm font-semibold underline underline-offset-4 hover:no-underline"
        >
          {linkLabel}
        </a>
      )}
    </div>
  </article>
);

export default StoryCard;
