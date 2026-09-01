import { cn } from 'drupal-canvas';

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-gray-900 text-white hover:bg-gray-800',
  outline:
    'border border-current bg-transparent text-current hover:bg-current/10',
  ghost: 'bg-transparent text-current hover:bg-current/10',
  link: 'bg-transparent p-0 text-current underline underline-offset-4 hover:no-underline',
};

const sizes = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

const Button = ({
  label,
  url,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  openInNewTab = false,
  className,
}) => {
  if (!label) {
    return null;
  }

  return (
    <a
      href={url || '/'}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noreferrer noopener' : undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        variants[variant],
        variant !== 'link' && sizes[size],
        fullWidth && 'w-full',
        className,
      )}
    >
      {label}
    </a>
  );
};

export default Button;
