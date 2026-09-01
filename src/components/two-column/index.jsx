import { cn } from 'drupal-canvas';

const ratios = {
  even: 'md:grid-cols-2',
  wide_start: 'md:grid-cols-[2fr_1fr]',
  wide_end: 'md:grid-cols-[1fr_2fr]',
};

const alignments = {
  start: 'items-start',
  center: 'items-center',
  stretch: 'items-stretch',
};

const gaps = {
  small: 'gap-6',
  medium: 'gap-10',
  large: 'gap-16',
};

const TwoColumn = ({
  ratio = 'even',
  verticalAlign = 'start',
  gap = 'medium',
  reverseOnMobile = false,
  start,
  end,
  className,
}) => (
  <div
    className={cn(
      'grid w-full grid-cols-1',
      ratios[ratio],
      alignments[verticalAlign],
      gaps[gap],
      className,
    )}
  >
    <div className={cn(reverseOnMobile && 'order-2 md:order-1')}>{start}</div>
    <div className={cn(reverseOnMobile && 'order-1 md:order-2')}>{end}</div>
  </div>
);

export default TwoColumn;
