import { cn, FormattedText } from 'drupal-canvas';

const variants = {
  plain: '',
  bordered: 'rounded-xl border border-gray-200 p-6',
  filled: 'rounded-xl bg-white p-6 shadow-sm',
};

const aligns = {
  left: 'text-left items-start',
  center: 'text-center items-center',
};

const FeatureCard = ({
  icon,
  title,
  body,
  url,
  linkLabel,
  variant = 'plain',
  align = 'left',
  className,
}) => (
  <div
    className={cn(
      'flex h-full flex-col gap-3',
      variants[variant],
      aligns[align],
      className,
    )}
  >
    {icon?.src && (
      <img
        src={icon.src}
        alt={icon.alt || ''}
        width={icon.width}
        height={icon.height}
        className="mb-1 h-12 w-12 object-contain"
      />
    )}
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    {body && (
      <FormattedText className="text-sm leading-relaxed opacity-80 [&_p]:mb-2 [&_p:last-child]:mb-0">
        {body}
      </FormattedText>
    )}
    {linkLabel && (
      <a
        href={url || '/'}
        className="mt-auto pt-2 text-sm font-semibold underline underline-offset-4 hover:no-underline"
      >
        {linkLabel}
      </a>
    )}
  </div>
);

export default FeatureCard;
