import { cn } from 'drupal-canvas';

const tones = {
  neutral: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-100 text-primary-800',
  dark: 'bg-gray-900 text-white',
  outline: 'border border-current text-current',
};

const Badge = ({ label, tone = 'neutral', className }) => {
  if (!label) {
    return null;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        tones[tone],
        className,
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
