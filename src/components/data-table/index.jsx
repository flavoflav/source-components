import { cn, FormattedText } from 'drupal-canvas';

const DataTable = ({
  title,
  intro,
  caption,
  headers,
  rows,
  striped = true,
  compact = false,
  className,
}) => {
  const headerCells = (headers || '')
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean);

  const bodyRows = (rows || '')
    .split('\n')
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => row.split('|').map((cell) => cell.trim()));

  if (headerCells.length === 0 && bodyRows.length === 0) {
    return null;
  }

  const cellPadding = compact ? 'px-4 py-2' : 'px-5 py-3.5';

  return (
    <section className={cn('w-full py-12', className)}>
      <div className="mx-auto max-w-7xl px-6">
        {(title || intro) && (
          <div className="mb-8 flex flex-col gap-3">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {title}
              </h2>
            )}
            {intro && (
              <FormattedText className="max-w-2xl leading-relaxed opacity-80">
                {intro}
              </FormattedText>
            )}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-max border-collapse text-left text-sm">
            {caption && (
              <caption className="px-5 py-3 text-left text-sm opacity-60">
                {caption}
              </caption>
            )}
            {headerCells.length > 0 && (
              <thead className="bg-gray-50">
                <tr>
                  {headerCells.map((cell) => (
                    <th
                      key={cell}
                      scope="col"
                      className={cn(
                        'border-b border-gray-200 font-semibold',
                        cellPadding,
                      )}
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    'border-b border-gray-100 last:border-b-0',
                    striped && i % 2 === 1 && 'bg-gray-50/60',
                  )}
                >
                  {row.map((cell, j) => (
                    <td key={j} className={cellPadding}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
