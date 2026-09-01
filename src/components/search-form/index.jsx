import { cn } from 'drupal-canvas';

const sizes = {
  small: 'h-9 text-sm',
  medium: 'h-11 text-base',
  large: 'h-14 text-lg',
};

const SearchForm = ({
  action = '/search',
  fieldName = 'q',
  placeholder = 'Search',
  label = 'Search',
  buttonLabel,
  size = 'medium',
  className,
}) => (
  <form
    action={action}
    method="get"
    role="search"
    className={cn('flex w-full items-stretch gap-2', className)}
  >
    <label className="sr-only" htmlFor={`search-${fieldName}`}>
      {label}
    </label>
    <div className="relative flex-1">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 opacity-50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        id={`search-${fieldName}`}
        type="search"
        name={fieldName}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-md border border-gray-300 bg-white pr-3 pl-9 text-gray-900 focus:border-primary-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500',
          sizes[size],
        )}
      />
    </div>
    {buttonLabel && (
      <button
        type="submit"
        className={cn(
          'shrink-0 rounded-md bg-primary-600 px-5 font-semibold text-white hover:bg-primary-700',
          sizes[size],
        )}
      >
        {buttonLabel}
      </button>
    )}
  </form>
);

export default SearchForm;
