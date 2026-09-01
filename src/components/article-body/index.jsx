import { cn, FormattedText } from 'drupal-canvas';

const ArticleBody = ({
  title,
  standfirst,
  body,
  heroImage,
  category,
  date,
  authorName,
  authorTitle,
  authorImage,
  readingTime,
  aside,
  footer,
  className,
}) => (
  <article className={cn('w-full py-12', className)}>
    <div className="mx-auto max-w-3xl px-6">
      <header className="flex flex-col gap-5">
        {category && (
          <p className="text-xs font-semibold tracking-widest uppercase opacity-60">
            {category}
          </p>
        )}
        {title && (
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            {title}
          </h1>
        )}
        {standfirst && (
          <p className="text-xl leading-relaxed opacity-75">{standfirst}</p>
        )}
        {(authorName || date) && (
          <div className="flex flex-wrap items-center gap-3 border-y border-gray-200 py-4 text-sm">
            {authorImage?.src && (
              <img
                src={authorImage.src}
                alt={authorImage.alt || ''}
                width={authorImage.width}
                height={authorImage.height}
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <span>
              {authorName && (
                <span className="block font-semibold">{authorName}</span>
              )}
              {authorTitle && (
                <span className="block text-xs opacity-60">{authorTitle}</span>
              )}
            </span>
            <span className="ml-auto flex items-center gap-2 text-xs opacity-60">
              {date && <time>{date}</time>}
              {date && readingTime && <span aria-hidden="true">·</span>}
              {readingTime && <span>{readingTime}</span>}
            </span>
          </div>
        )}
      </header>

      {heroImage?.src && (
        <img
          src={heroImage.src}
          alt={heroImage.alt || ''}
          width={heroImage.width}
          height={heroImage.height}
          className="my-10 w-full rounded-xl object-cover"
        />
      )}

      {body && (
        <FormattedText className="mt-8 leading-relaxed [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:my-8 [&_img]:rounded-xl [&_li]:mb-2 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6">
          {body}
        </FormattedText>
      )}

      {aside && <div className="my-10">{aside}</div>}
      {footer && (
        <div className="mt-12 border-t border-gray-200 pt-8">{footer}</div>
      )}
    </div>
  </article>
);

export default ArticleBody;
