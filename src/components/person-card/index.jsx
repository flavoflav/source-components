import { cn, FormattedText } from 'drupal-canvas';

const aligns = {
  left: 'text-left items-start',
  center: 'text-center items-center',
};

const PersonCard = ({
  name,
  role,
  photo,
  bio,
  email,
  linkedinUrl,
  url,
  align = 'left',
  photoShape = 'rounded',
  className,
}) => {
  if (!name) {
    return null;
  }

  return (
    <article
      className={cn('flex h-full flex-col gap-3', aligns[align], className)}
    >
      {photo?.src && (
        <img
          src={photo.src}
          alt={photo.alt || name}
          width={photo.width}
          height={photo.height}
          className={cn(
            'mb-2 object-cover',
            photoShape === 'circle'
              ? 'h-32 w-32 rounded-full'
              : 'aspect-[4/5] w-full rounded-xl',
          )}
        />
      )}
      <h3 className="text-lg font-semibold">
        {url ? (
          <a href={url} className="hover:underline">
            {name}
          </a>
        ) : (
          name
        )}
      </h3>
      {role && <p className="text-sm font-medium opacity-70">{role}</p>}
      {bio && (
        <FormattedText className="text-sm leading-relaxed opacity-75">
          {bio}
        </FormattedText>
      )}
      {(email || linkedinUrl) && (
        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm">
          {email && (
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-4 hover:no-underline"
            >
              Email
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 hover:no-underline"
            >
              LinkedIn
            </a>
          )}
        </p>
      )}
    </article>
  );
};

export default PersonCard;
