import { cn } from 'drupal-canvas';

const columns = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};

const gaps = {
  none: 'gap-0',
  small: 'gap-4',
  medium: 'gap-6',
  large: 'gap-10',
};

const GridContainer = ({
  columnCount = 3,
  gap = 'medium',
  items,
  className,
}) => (
  <div
    className={cn(
      'grid w-full',
      columns[columnCount] || columns[3],
      gaps[gap],
      className,
    )}
  >
    {items}
  </div>
);

export default GridContainer;
