import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
};

const Accordion = ({
  title,
  intro,
  background = 'none',
  width = 'narrow',
  items,
  className,
}) => (
  <section className={cn('w-full py-16', backgrounds[background], className)}>
    <div
      className={cn(
        'mx-auto px-6',
        width === 'narrow' ? 'max-w-3xl' : 'max-w-5xl',
      )}
    >
      {(title || intro) && (
        <div className="mb-10 flex flex-col gap-3">
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
          )}
          {intro && (
            <FormattedText className="text-lg leading-relaxed opacity-80">
              {intro}
            </FormattedText>
          )}
        </div>
      )}
      <div className="divide-y divide-current/15 border-y border-current/15">
        {items}
      </div>
    </div>
  </section>
);

export default Accordion;
