import { cn } from 'drupal-canvas';

const FilterSelect = ({
  label,
  fieldName,
  options,
  allLabel = 'All',
  className,
}) => {
  if (!label || !fieldName) {
    return null;
  }

  const values = (options || '')
    .split('\n')
    .map((option) => option.trim())
    .filter(Boolean);

  return (
    <div className={cn('flex min-w-44 flex-col gap-1.5', className)}>
      <label
        htmlFor={`filter-${fieldName}`}
        className="text-xs font-semibold tracking-wide uppercase opacity-60"
      >
        {label}
      </label>
      <select
        id={`filter-${fieldName}`}
        name={fieldName}
        defaultValue=""
        className="h-11 rounded-md border border-gray-300 bg-white px-3 focus:border-primary-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
      >
        <option value="">{allLabel}</option>
        {values.map((value) => (
          <option key={value} value={value.toLowerCase().replace(/\s+/g, '-')}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
