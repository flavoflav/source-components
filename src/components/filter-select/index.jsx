import { useEffect, useId, useRef } from 'react';
import { cn } from 'drupal-canvas';

const FilterSelect = ({
  label,
  fieldName,
  options,
  allLabel = 'All',
  className,
}) => {
  const selectRef = useRef(null);
  const selectId = `${useId()}-${fieldName}`;

  // The form is a plain GET, so the page reloads on submit. Restore the chosen
  // option from the URL, otherwise every filter snaps back to "All".
  useEffect(() => {
    if (!fieldName || !selectRef.current) {
      return;
    }
    const current = new URLSearchParams(window.location.search).get(fieldName);
    if (
      current !== null &&
      [...selectRef.current.options].some((o) => o.value === current)
    ) {
      selectRef.current.value = current;
    }
  }, [fieldName, options]);

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
        htmlFor={selectId}
        className="text-xs font-semibold tracking-wide uppercase opacity-60"
      >
        {label}
      </label>
      <select
        ref={selectRef}
        id={selectId}
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
