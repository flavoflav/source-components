import { cn } from 'drupal-canvas';

const layouts = {
  horizontal: 'flex-row flex-wrap items-center gap-x-8 gap-y-3',
  vertical: 'flex-col gap-4',
};

const MainNavigation = ({
  label = 'Main',
  layout = 'horizontal',
  items,
  className,
}) => (
  <nav aria-label={label} className={cn('w-full lg:w-auto', className)}>
    <ul className={cn('flex', layouts[layout])}>{items}</ul>
  </nav>
);

export default MainNavigation;
