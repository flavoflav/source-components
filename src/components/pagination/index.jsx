import { cn } from 'drupal-canvas';

const buildPages = (current, total) => {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
};

const Pagination = ({
  currentPage,
  totalPages,
  baseUrl = '/',
  pageParam = 'page',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  className,
}) => {
  if (!totalPages || totalPages <= 1 || !currentPage) {
    return null;
  }

  const href = (page) =>
    `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${pageParam}=${page}`;
  const pages = buildPages(currentPage, totalPages);
  const link =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-gray-300 px-3 text-sm hover:bg-gray-50';

  return (
    <nav aria-label="Pagination" className={cn('w-full py-8', className)}>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li className="list-none">
          {currentPage > 1 ? (
            <a href={href(currentPage - 1)} className={link}>
              {previousLabel}
            </a>
          ) : (
            <span className={cn(link, 'opacity-40')}>{previousLabel}</span>
          )}
        </li>
        {pages.map((page, i) => (
          <li key={page} className="flex list-none items-center gap-2">
            {i > 0 && page - pages[i - 1] > 1 && (
              <span className="px-1 opacity-50">…</span>
            )}
            {page === currentPage ? (
              <span
                aria-current="page"
                className={cn(
                  link,
                  'border-primary-600 bg-primary-600 font-semibold text-white',
                )}
              >
                {page}
              </span>
            ) : (
              <a href={href(page)} className={link}>
                {page}
              </a>
            )}
          </li>
        ))}
        <li className="list-none">
          {currentPage < totalPages ? (
            <a href={href(currentPage + 1)} className={link}>
              {nextLabel}
            </a>
          ) : (
            <span className={cn(link, 'opacity-40')}>{nextLabel}</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
