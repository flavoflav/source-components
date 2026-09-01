import { cn } from 'drupal-canvas';

const sizes = {
  medium: 'text-4xl md:text-5xl',
  large: 'text-5xl md:text-6xl',
};

const aligns = {
  left: 'text-left items-start',
  center: 'text-center items-center',
};

const StatCard = ({
  value,
  label,
  description,
  prefix,
  suffix,
  size = 'large',
  align = 'center',
  bordered = false,
  className,
}) => {
  if (!value) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col gap-2',
        aligns[align],
        bordered && 'rounded-xl border border-current/15 p-6',
        className,
      )}
    >
      <p
        className={cn('font-semibold tracking-tight tabular-nums', sizes[size])}
      >
        {prefix}
        {value}
        {suffix}
      </p>
      {label && <p className="text-base font-semibold">{label}</p>}
      {description && (
        <p className="text-sm leading-relaxed opacity-70">{description}</p>
      )}
    </div>
  );
};

export default StatCard;
