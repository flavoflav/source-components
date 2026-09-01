import { cn } from 'drupal-canvas';

const SpecList = ({
  title,
  columnCount = 1,
  variant = 'divided',
  items,
  className,
}) => (
  <div className={cn('w-full', className)}>
    {title && (
      <h3 className="mb-4 text-sm font-semibold tracking-widest uppercase opacity-60">
        {title}
      </h3>
    )}
    <dl
      className={cn(
        'grid grid-cols-1 gap-x-10',
        columnCount === 2 && 'sm:grid-cols-2',
        variant === 'divided' && 'divide-y divide-current/10',
        variant === 'bordered' && 'rounded-xl border border-current/15 px-5',
      )}
    >
      {items}
    </dl>
  </div>
);

export default SpecList;
