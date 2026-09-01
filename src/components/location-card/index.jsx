import { cn } from 'drupal-canvas';

const LocationCard = ({
  name,
  addressLines,
  phone,
  email,
  hours,
  mapUrl,
  image,
  variant = 'plain',
  className,
}) => (
  <div
    className={cn(
      'flex h-full flex-col gap-3',
      variant === 'bordered' && 'rounded-xl border border-current/15 p-6',
      variant === 'filled' && 'rounded-xl bg-gray-50 p-6',
      className,
    )}
  >
    {image?.src && (
      <img
        src={image.src}
        alt={image.alt || ''}
        width={image.width}
        height={image.height}
        className="mb-2 aspect-[3/2] w-full rounded-lg object-cover"
      />
    )}
    {name && <h3 className="text-lg font-semibold">{name}</h3>}
    {addressLines && (
      <address className="text-sm leading-relaxed whitespace-pre-line not-italic opacity-80">
        {addressLines}
      </address>
    )}
    <dl className="flex flex-col gap-1 text-sm">
      {phone && (
        <div className="flex gap-2">
          <dt className="opacity-60">Phone</dt>
          <dd>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="hover:underline"
            >
              {phone}
            </a>
          </dd>
        </div>
      )}
      {email && (
        <div className="flex gap-2">
          <dt className="opacity-60">Email</dt>
          <dd>
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </dd>
        </div>
      )}
      {hours && (
        <div className="flex gap-2">
          <dt className="opacity-60">Hours</dt>
          <dd>{hours}</dd>
        </div>
      )}
    </dl>
    {mapUrl && (
      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-auto pt-2 text-sm font-semibold underline underline-offset-4 hover:no-underline"
      >
        View on map
      </a>
    )}
  </div>
);

export default LocationCard;
