import { Children, useState } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const splitLines = (value) =>
  (value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const ComponentSpec = ({
  componentName,
  componentId,
  family,
  description,
  propsTable,
  slotNames,
  mockNames,
  usedOn,
  capabilities,
  defaultOpen = false,
  sources,
  className,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [tab, setTab] = useState(0);

  if (!componentName) {
    return null;
  }

  const rows = splitLines(propsTable).map((row) =>
    row.split('|').map((cell) => cell.trim()),
  );
  const header = rows.length ? rows[0] : [];
  const body = rows.slice(1);
  const slots = splitLines(slotNames);
  const mocks = splitLines(mockNames);
  const pages = splitLines(usedOn);
  const caps = splitLines(capabilities);
  const files = Children.toArray(sources);

  const required = body.filter((r) => (r[2] || '').toLowerCase() === 'yes');

  return (
    <article
      className={cn(
        'w-full overflow-hidden rounded-md border border-gray-200 bg-white',
        className,
      )}
    >
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50"
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-base font-semibold">{componentName}</span>
            <code className="rounded bg-primary-100 px-1.5 py-0.5 font-mono text-xs text-primary-800">
              {componentId}
            </code>
            {family && (
              <span className="font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                {family}
              </span>
            )}
          </span>

          <span className="hidden shrink-0 gap-3 font-mono text-xs text-gray-500 tabular-nums sm:flex">
            <span>{body.length} props</span>
            <span>{slots.length} slots</span>
          </span>

          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 text-gray-500 transition-transform',
              open && 'rotate-45',
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </button>
      </h3>

      {open && (
        <div className="flex flex-col gap-6 border-t border-gray-200 px-4 py-5">
          {description && (
            <FormattedText className="max-w-3xl leading-relaxed text-gray-700">
              {description}
            </FormattedText>
          )}

          <dl className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-gray-600">
            <div className="flex gap-2">
              <dt className="text-gray-400">props</dt>
              <dd className="tabular-nums">{body.length}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-gray-400">required</dt>
              <dd className="tabular-nums">{required.length}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-gray-400">slots</dt>
              <dd className="tabular-nums">{slots.length}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-gray-400">mocks</dt>
              <dd className="tabular-nums">{mocks.length}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-gray-400">on pages</dt>
              <dd className="tabular-nums">{pages.length}</dd>
            </div>
          </dl>

          {body.length > 0 && (
            <section>
              <h4 className="mb-2 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                Props
              </h4>
              <div className="overflow-x-auto rounded border border-gray-200">
                <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      {header.map((cell) => (
                        <th
                          key={cell}
                          scope="col"
                          className="border-b border-gray-200 px-3 py-2 font-mono text-[0.65rem] font-medium tracking-widest text-gray-500 uppercase"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {body.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={cn(
                              'px-3 py-2 align-top',
                              j === 0 &&
                                'font-mono font-medium whitespace-nowrap',
                              j > 0 && 'text-gray-600',
                            )}
                          >
                            {j === 2 && cell.toLowerCase() === 'yes' ? (
                              <span className="rounded border border-amber-400/50 bg-amber-400/10 px-1.5 font-mono text-[0.65rem] tracking-wide text-amber-300 uppercase">
                                req
                              </span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <div className="flex flex-wrap gap-x-10 gap-y-5">
            <section>
              <h4 className="mb-2 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                Slots
              </h4>
              {slots.length ? (
                <ul className="flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <li
                      key={s}
                      className="list-none rounded border border-primary-300 bg-primary-100 px-2 py-0.5 font-mono text-xs text-primary-800"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">Props only.</p>
              )}
            </section>

            {mocks.length > 0 && (
              <section>
                <h4 className="mb-2 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                  Workbench mocks
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {mocks.map((m) => (
                    <li
                      key={m}
                      className="list-none rounded border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-600"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {pages.length > 0 && (
              <section>
                <h4 className="mb-2 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                  Used on
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {pages.map((p) => (
                    <li
                      key={p}
                      className="list-none rounded border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-600"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {files.length > 0 && (
            <section>
              <h4 className="mb-2 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                Source
              </h4>
              {files.length > 1 && (
                <div role="tablist" className="mb-2 flex flex-wrap gap-1">
                  {files.map((file, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={tab === i}
                      onClick={() => setTab(i)}
                      className={cn(
                        'rounded border px-3 py-1 font-mono text-xs',
                        tab === i
                          ? 'border-primary-500 bg-primary-100 text-primary-800'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
                      )}
                    >
                      {file?.props?.filename || `File ${i + 1}`}
                    </button>
                  ))}
                </div>
              )}
              {files[Math.min(tab, files.length - 1)]}
            </section>
          )}

          {caps.length > 0 && <span className="sr-only">{caps.join(' ')}</span>}
        </div>
      )}
    </article>
  );
};

export default ComponentSpec;
