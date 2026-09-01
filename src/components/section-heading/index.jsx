import { cn, FormattedText } from 'drupal-canvas';

const aligns = {
  left: 'text-left items-start',
  center: 'text-center items-center mx-auto',
};

const sizes = {
  medium: 'text-2xl md:text-3xl',
  large: 'text-3xl md:text-4xl',
  extra_large: 'text-4xl md:text-5xl',
};

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = 'center',
  size = 'large',
  headingLevel = 'h2',
  className,
}) => {
  const Tag = headingLevel;

  if (!title && !eyebrow && !intro) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex w-full max-w-3xl flex-col gap-4',
        aligns[align],
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold tracking-widest uppercase opacity-70">
          {eyebrow}
        </p>
      )}
      {title && (
        <Tag
          className={cn(
            'font-semibold tracking-tight text-balance',
            sizes[size],
          )}
        >
          {title}
        </Tag>
      )}
      {intro && (
        <FormattedText className="text-lg leading-relaxed opacity-80 [&_p]:mb-3 [&_p:last-child]:mb-0">
          {intro}
        </FormattedText>
      )}
    </div>
  );
};

export default SectionHeading;
