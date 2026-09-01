import { cn } from 'drupal-canvas';

const FilterBar = ({
  action = '/',
  searchFieldName = 'q',
  searchPlaceholder = 'Search',
  showSearch = true,
  resultCountLabel,
  submitLabel = 'Apply',
  sticky = false,
  filters,
  className,
}) => (
  <form
    action={action}
    method="get"
    className={cn(
      'z-20 w-full border-b border-gray-200 bg-white py-4',
      sticky && 'sticky top-0',
      className,
    )}
  >
    <div className="mx-auto flex max-w-7xl flex-wrap items-end gap-4 px-6">
      {showSearch && (
        <div className="flex min-w-56 flex-1 flex-col gap-1.5">
          <label
            htmlFor={`filter-${searchFieldName}`}
            className="text-xs font-semibold tracking-wide uppercase opacity-60"
          >
            Search
          </label>
          <input
            id={`filter-${searchFieldName}`}
            type="search"
            name={searchFieldName}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-md border border-gray-300 px-3 focus:border-primary-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
          />
        </div>
      )}

      {filters}

      <button
        type="submit"
        className="h-11 shrink-0 rounded-md bg-primary-600 px-6 font-semibold text-white hover:bg-primary-700"
      >
        {submitLabel}
      </button>

      {resultCountLabel && (
        <p className="w-full text-sm opacity-60 md:ml-auto md:w-auto">
          {resultCountLabel}
        </p>
      )}
    </div>
  </form>
);

export default FilterBar;
