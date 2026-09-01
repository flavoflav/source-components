import { cn } from 'drupal-canvas';

const Breadcrumb = ({ label = 'Breadcrumb', items, className }) => (
  <nav aria-label={label} className={cn('w-full text-sm', className)}>
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 opacity-80">
      {items}
    </ol>
  </nav>
);

export default Breadcrumb;
