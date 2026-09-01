import { cn } from 'drupal-canvas';

const SpecItem = ({ label, value, className }) => {
  if (!label) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6',
        className,
      )}
    >
      <dt className="text-sm font-semibold opacity-60 sm:w-40 sm:shrink-0">
        {label}
      </dt>
      <dd className="flex-1">{value}</dd>
    </div>
  );
};

export default SpecItem;
