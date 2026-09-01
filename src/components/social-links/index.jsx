import { cn } from 'drupal-canvas';

const icons = {
  linkedin:
    'M6.94 5a2 2 0 11-4-.02 2 2 0 014 .02zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z',
  x: 'M18.9 2H22l-7.1 8.12L23.5 22h-6.6l-5.18-6.77L5.8 22H2.7l7.6-8.68L2 2h6.77l4.68 6.19L18.9 2zm-1.1 18h1.72L7.3 3.9H5.46L17.8 20z',
  youtube:
    'M23 12s0-3.3-.42-4.88a2.53 2.53 0 00-1.78-1.79C19.22 5 12 5 12 5s-7.22 0-8.8.33a2.53 2.53 0 00-1.78 1.8C1 8.7 1 12 1 12s0 3.3.42 4.88a2.53 2.53 0 001.78 1.79C4.78 19 12 19 12 19s7.22 0 8.8-.33a2.53 2.53 0 001.78-1.8C23 15.3 23 12 23 12zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
  facebook:
    'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0022 12z',
  instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 3.4a6.44 6.44 0 100 12.88 6.44 6.44 0 000-12.88zm0 10.62a4.18 4.18 0 110-8.36 4.18 4.18 0 010 8.36zm6.69-10.87a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
};

const sizes = {
  small: 'h-8 w-8',
  medium: 'h-10 w-10',
};

const SocialLink = ({ href, name, size }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={name}
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-current/25 transition-opacity hover:opacity-70',
        sizes[size],
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d={icons[name]} />
      </svg>
    </a>
  ) : null;

const SocialLinks = ({
  linkedinUrl,
  xUrl,
  youtubeUrl,
  facebookUrl,
  instagramUrl,
  size = 'medium',
  className,
}) => (
  <ul className={cn('flex flex-wrap items-center gap-3', className)}>
    {[
      ['linkedin', linkedinUrl],
      ['x', xUrl],
      ['youtube', youtubeUrl],
      ['facebook', facebookUrl],
      ['instagram', instagramUrl],
    ].map(([name, href]) =>
      href ? (
        <li key={name} className="list-none">
          <SocialLink href={href} name={name} size={size} />
        </li>
      ) : null,
    )}
  </ul>
);

export default SocialLinks;
