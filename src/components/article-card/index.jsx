import { cn } from 'drupal-canvas';

const variants = {
  plain: '',
  bordered: 'rounded-xl border border-gray-200',
  elevated: 'rounded-xl bg-white shadow-md',
};

const ArticleCard = ({
  title,
  url,
  summary,
  image,
  category,
  date,
  author,
  readingTime,
  variant = 'plain',
  layout = 'vertical',
  className,
}) => {
  if (!title) {
    return null;
  }

  return (
    <article
      className={cn(
        'group flex h-full overflow-hidden',
        layout === 'horizontal' ? 'flex-col gap-5 sm:flex-row' : 'flex-col',
        variants[variant],
        className,
      )}
    >
      {image?.src && (
        <a
          href={url || '/'}
          className={cn(
            'block shrink-0 overflow-hidden',
            layout === 'horizontal' ? 'sm:w-2/5' : 'w-full',
          )}
        >
          <img
            src={image.src}
            alt={image.alt || ''}
            width={image.width}
            height={image.height}
            className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>
      )}

      <div
        className={cn(
          'flex flex-1 flex-col gap-3',
          variant === 'plain' && layout === 'vertical' ? 'pt-5' : 'p-5',
          layout === 'horizontal' && variant === 'plain' && 'p-0',
        )}
      >
        {category && (
          <p className="text-xs font-semibold tracking-widest uppercase opacity-60">
            {category}
          </p>
        )}
        <h3 className="text-lg leading-snug font-semibold">
          <a href={url || '/'} className="hover:underline">
            {title}
          </a>
        </h3>
        {summary && (
          <p className="line-clamp-3 text-sm leading-relaxed opacity-75">
            {summary}
          </p>
        )}
        {(date || author || readingTime) && (
          <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-xs opacity-60">
            {author && <span>{author}</span>}
            {author && date && <span aria-hidden="true">·</span>}
            {date && <time>{date}</time>}
            {readingTime && <span aria-hidden="true">·</span>}
            {readingTime && <span>{readingTime}</span>}
          </p>
        )}
      </div>
    </article>
  );
};

export default ArticleCard;
