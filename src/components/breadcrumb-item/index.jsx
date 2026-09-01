import { cn } from 'drupal-canvas';

const BreadcrumbItem = ({ label, url, current = false, className }) => {
  if (!label) {
    return null;
  }

  return (
    <li className={cn('flex list-none items-center gap-2', className)}>
      {current ? (
        <span aria-current="page" className="font-semibold">
          {label}
        </span>
      ) : (
        <>
          <a href={url || '/'} className="hover:underline">
            {label}
          </a>
          <span aria-hidden="true" className="opacity-50">
            /
          </span>
        </>
      )}
    </li>
  );
};

export default BreadcrumbItem;
