import { cn } from 'drupal-canvas';

// Day and month for the date badge. Accepts "12 May" style text or an ISO
// date ("2026-05-12"); anything else falls back to splitting on the first space.
const badgeParts = (value) => {
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (iso) {
    const date = new Date(Date.UTC(+iso[1], +iso[2] - 1, +iso[3]));
    return [
      String(date.getUTCDate()),
      new Intl.DateTimeFormat('en-GB', {
        month: 'short',
        timeZone: 'UTC',
      }).format(date),
    ];
  }
  const [day, ...rest] = value.split(' ');
  return [day, rest.join(' ')];
};

const EventCard = ({
  title,
  url,
  startDate,
  endDate,
  timeLabel,
  location,
  format,
  summary,
  image,
  ctaLabel,
  variant = 'bordered',
  className,
}) => {
  if (!title) {
    return null;
  }

  return (
    <article
      className={cn(
        'group flex h-full gap-5',
        variant === 'bordered' && 'rounded-xl border border-gray-200 p-5',
        variant === 'filled' && 'rounded-xl bg-gray-50 p-5',
        className,
      )}
    >
      {startDate && !image?.src && (
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary-600 text-white">
          <span className="text-xl leading-none font-semibold tabular-nums">
            {badgeParts(startDate)[0]}
          </span>
          <span className="mt-1 text-[0.65rem] tracking-widest uppercase">
            {badgeParts(startDate)[1]}
          </span>
        </div>
      )}
      {image?.src && (
        <img
          src={image.src}
          alt={image.alt || ''}
          width={image.width}
          height={image.height}
          className="h-24 w-32 shrink-0 rounded-lg object-cover"
        />
      )}

      <div className="flex flex-1 flex-col gap-2">
        {format && (
          <p className="text-xs font-semibold tracking-widest uppercase opacity-60">
            {format}
          </p>
        )}
        <h3 className="leading-snug font-semibold">
          <a href={url || '/'} className="hover:underline">
            {title}
          </a>
        </h3>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-70">
          {startDate && (
            <time>
              {startDate}
              {endDate && ` - ${endDate}`}
            </time>
          )}
          {timeLabel && <span>{timeLabel}</span>}
          {location && <span>{location}</span>}
        </p>
        {summary && (
          <p className="line-clamp-2 text-sm leading-relaxed opacity-75">
            {summary}
          </p>
        )}
        {ctaLabel && url && (
          <a
            href={url}
            className="mt-auto pt-3 text-sm font-semibold underline underline-offset-4 hover:no-underline"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </article>
  );
};

export default EventCard;
