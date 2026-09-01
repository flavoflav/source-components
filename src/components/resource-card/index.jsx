import { cn } from 'drupal-canvas';

const ResourceCard = ({
  title,
  url,
  summary,
  resourceType,
  coverImage,
  fileFormat,
  fileSize,
  gated = false,
  linkLabel = 'Download',
  variant = 'bordered',
  className,
}) => (
  <article
    className={cn(
      'group flex h-full gap-5',
      variant === 'bordered' && 'rounded-xl border border-gray-200 p-5',
      variant === 'filled' && 'rounded-xl bg-gray-50 p-5',
      className,
    )}
  >
    {coverImage?.src && (
      <img
        src={coverImage.src}
        alt={coverImage.alt || ''}
        width={coverImage.width}
        height={coverImage.height}
        className="h-32 w-24 shrink-0 rounded-md object-cover shadow-sm"
      />
    )}
    <div className="flex flex-1 flex-col gap-2">
      {resourceType && (
        <p className="text-xs font-semibold tracking-widest uppercase opacity-60">
          {resourceType}
        </p>
      )}
      {title && (
        <h3 className="leading-snug font-semibold">
          <a href={url || '/'} className="hover:underline">
            {title}
          </a>
        </h3>
      )}
      {summary && (
        <p className="line-clamp-3 text-sm leading-relaxed opacity-75">
          {summary}
        </p>
      )}
      <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-xs opacity-60">
        {fileFormat && <span className="font-semibold">{fileFormat}</span>}
        {fileSize && <span>{fileSize}</span>}
        {gated && <span>Registration required</span>}
      </p>
      {url && (
        <a
          href={url}
          className="text-sm font-semibold underline underline-offset-4 hover:no-underline"
        >
          {linkLabel}
        </a>
      )}
    </div>
  </article>
);

export default ResourceCard;
