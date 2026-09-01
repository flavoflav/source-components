import { cn, FormattedText } from 'drupal-canvas';

const TabPanel = ({ title, body, image, content, actions, className }) => (
  <div
    className={cn(
      'grid grid-cols-1 items-center gap-10',
      image?.src && 'md:grid-cols-2',
      className,
    )}
  >
    <div className="flex flex-col gap-4">
      {title && (
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h3>
      )}
      {body && (
        <FormattedText className="text-lg leading-relaxed opacity-80 [&_li]:mb-2 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5">
          {body}
        </FormattedText>
      )}
      {content}
      {actions && <div className="mt-2 flex flex-wrap gap-4">{actions}</div>}
    </div>
    {image?.src && (
      <img
        src={image.src}
        alt={image.alt || ''}
        width={image.width}
        height={image.height}
        className="w-full rounded-xl object-cover"
      />
    )}
  </div>
);

export default TabPanel;
