import { cn, FormattedText } from 'drupal-canvas';

const StepItem = ({ title, body, image, index, className }) => {
  if (!title) {
    return null;
  }

  return (
    <li className={cn('flex list-none gap-5', className)}>
      {index != null && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white tabular-nums">
          {index}
        </span>
      )}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {body && (
          <FormattedText className="leading-relaxed opacity-80 [&_p]:mb-3 [&_p:last-child]:mb-0">
            {body}
          </FormattedText>
        )}
        {image?.src && (
          <img
            src={image.src}
            alt={image.alt || ''}
            width={image.width}
            height={image.height}
            className="mt-3 w-full rounded-lg object-cover"
          />
        )}
      </div>
    </li>
  );
};

export default StepItem;
