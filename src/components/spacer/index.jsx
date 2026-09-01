import { cn } from 'drupal-canvas';

const heights = {
  extra_small: 'h-4',
  small: 'h-8',
  medium: 'h-16',
  large: 'h-24',
  extra_large: 'h-32',
};

const Spacer = ({ height = 'medium', className }) => (
  <div
    aria-hidden="true"
    className={cn('w-full', heights[height], className)}
  />
);

export default Spacer;
