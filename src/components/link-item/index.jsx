import { cn } from 'drupal-canvas';

const LinkItem = ({
  label,
  url,
  description,
  icon,
  openInNewTab = false,
  className,
}) => {
  if (!label) {
    return null;
  }

  return (
    <li className={cn('list-none', className)}>
      <a
        href={url || '/'}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noreferrer noopener' : undefined}
        className="group flex items-start gap-3 hover:underline"
      >
        {icon?.src && (
          <img
            src={icon.src}
            alt={icon.alt || ''}
            width={icon.width}
            height={icon.height}
            className="mt-0.5 h-5 w-5 shrink-0 object-contain"
          />
        )}
        <span>
          <span className="block font-medium">{label}</span>
          {description && (
            <span className="mt-1 block text-sm opacity-70">{description}</span>
          )}
        </span>
      </a>
    </li>
  );
};

export default LinkItem;
