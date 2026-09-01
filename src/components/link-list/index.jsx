import { cn } from 'drupal-canvas';

const layouts = {
  stacked: 'flex-col gap-3',
  inline: 'flex-row flex-wrap gap-x-6 gap-y-3',
};

const LinkList = ({ heading, layout = 'stacked', items, className }) => (
  <nav className={cn('w-full', className)}>
    {heading && (
      <p className="mb-4 text-sm font-semibold tracking-wide uppercase">
        {heading}
      </p>
    )}
    <ul className={cn('flex', layouts[layout])}>{items}</ul>
  </nav>
);

export default LinkList;
