import { cn } from 'drupal-canvas';

const sizes = {
  small: 'text-xl md:text-2xl',
  medium: 'text-2xl md:text-3xl',
  large: 'text-3xl md:text-4xl',
  extra_large: 'text-4xl md:text-5xl',
  display: 'text-5xl md:text-6xl',
};

const aligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const Heading = ({
  text,
  level = 'h2',
  size = 'large',
  align = 'left',
  className,
}) => {
  const Tag = level;

  if (!text) {
    return null;
  }

  return (
    <Tag
      className={cn(
        'font-semibold tracking-tight text-balance',
        sizes[size],
        aligns[align],
        className,
      )}
    >
      {text}
    </Tag>
  );
};

export default Heading;
