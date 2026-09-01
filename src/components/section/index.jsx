import { cn } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  muted: 'bg-gray-100 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
};

const paddings = {
  none: 'py-0',
  small: 'py-8',
  medium: 'py-16',
  large: 'py-24',
};

const widths = {
  narrow: 'max-w-3xl',
  content: 'max-w-5xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
};

const Section = ({
  background = 'none',
  padding = 'medium',
  width = 'wide',
  content,
  className,
}) => (
  <section className={cn('w-full', backgrounds[background], className)}>
    <div className={cn('mx-auto px-6', widths[width], paddings[padding])}>
      {content}
    </div>
  </section>
);

export default Section;
