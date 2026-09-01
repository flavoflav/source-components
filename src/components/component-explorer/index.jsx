import { Children, useMemo, useState } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const splitLines = (value) =>
  (value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

// Everything the explorer filters on comes from the child Component Spec props,
// so the index can never drift from the specs it is listing.
const readSpec = (child) => {
  const p = child?.props || {};
  return {
    name: p.componentName || '',
    id: p.componentId || '',
    family: p.family || '',
    caps: splitLines(p.capabilities),
    haystack: [
      p.componentName,
      p.componentId,
      p.family,
      p.description,
      p.propsTable,
      p.slotNames,
      p.capabilities,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
};

const ComponentExplorer = ({
  title,
  intro,
  searchPlaceholder = 'Search',
  emptyMessage = 'Nothing matches those filters.',
  groupByFamily = true,
  components,
  className,
}) => {
  const [query, setQuery] = useState('');
  const [families, setFamilies] = useState([]);
  const [caps, setCaps] = useState([]);

  const entries = useMemo(
    () =>
      Children.toArray(components).map((child) => ({
        child,
        meta: readSpec(child),
      })),
    [components],
  );

  const familyOptions = useMemo(() => {
    const seen = [];
    entries.forEach(({ meta }) => {
      if (meta.family && !seen.includes(meta.family)) {
        seen.push(meta.family);
      }
    });
    return seen;
  }, [entries]);

  const capOptions = useMemo(() => {
    const seen = [];
    entries.forEach(({ meta }) =>
      meta.caps.forEach((c) => {
        if (!seen.includes(c)) {
          seen.push(c);
        }
      }),
    );
    return seen;
  }, [entries]);

  const q = query.trim().toLowerCase();
  const hits = entries.filter(({ meta }) => {
    if (families.length && !families.includes(meta.family)) {
      return false;
    }
    if (caps.length && !caps.every((c) => meta.caps.includes(c))) {
      return false;
    }
    return !q || meta.haystack.includes(q);
  });

  const toggle = (list, setList, value) =>
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );

  const active = Boolean(q || families.length || caps.length);

  const groups = groupByFamily
    ? familyOptions
        .map((fam) => ({
          fam,
          items: hits.filter(({ meta }) => meta.family === fam),
        }))
        .concat([{ fam: '', items: hits.filter(({ meta }) => !meta.family) }])
        .filter((g) => g.items.length)
    : [{ fam: '', items: hits }];

  const chip = (label, count, on, onClick) => (
    <button
      key={label}
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-xs',
        on
          ? 'border-primary-600 bg-primary-600 text-white'
          : 'border-gray-300 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-700',
      )}
    >
      {label}
      <span className={cn('tabular-nums', on ? 'opacity-80' : 'opacity-50')}>
        {count}
      </span>
    </button>
  );

  return (
    <section className={cn('w-full py-12', className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        {(title || intro) && (
          <header className="flex flex-col gap-3">
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <FormattedText className="max-w-3xl text-lg leading-relaxed text-gray-600">
                {intro}
              </FormattedText>
            )}
          </header>
        )}

        <div className="flex flex-col gap-4 rounded-md border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="component-explorer-search">
              {searchPlaceholder}
            </label>
            <input
              id="component-explorer-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 min-w-56 flex-1 rounded border border-gray-300 bg-white px-3 text-sm focus:border-primary-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
            />
            <p className="font-mono text-xs text-gray-500 tabular-nums">
              {hits.length} of {entries.length}
            </p>
            {active && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFamilies([]);
                  setCaps([]);
                }}
                className="font-mono text-xs text-gray-500 underline underline-offset-2 hover:text-primary-700"
              >
                Clear
              </button>
            )}
          </div>

          {familyOptions.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                Family
              </span>
              {familyOptions.map((fam) =>
                chip(
                  fam,
                  entries.filter(({ meta }) => meta.family === fam).length,
                  families.includes(fam),
                  () => toggle(families, setFamilies, fam),
                ),
              )}
            </div>
          )}

          {capOptions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                Has
              </span>
              {capOptions.map((c) =>
                chip(
                  c,
                  entries.filter(({ meta }) => meta.caps.includes(c)).length,
                  caps.includes(c),
                  () => toggle(caps, setCaps, c),
                ),
              )}
            </div>
          )}
        </div>

        {hits.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 px-6 py-16 text-center text-gray-500">
            {emptyMessage}
          </p>
        ) : (
          groups.map((group) => (
            <div key={group.fam || 'ungrouped'} className="flex flex-col gap-3">
              {groupByFamily && group.fam && (
                <h3 className="font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase">
                  {group.fam} &middot; {group.items.length}
                </h3>
              )}
              {group.items.map(({ child }) => child)}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ComponentExplorer;
