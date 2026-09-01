import { Children, useState } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
};

const perView = {
  1: 'basis-full',
  2: 'basis-full sm:basis-1/2',
  3: 'basis-full sm:basis-1/2 lg:basis-1/3',
};

const Carousel = ({
  title,
  intro,
  slidesPerView = 1,
  background = 'none',
  showArrows = true,
  slides,
  className,
}) => {
  const [index, setIndex] = useState(0);
  const count = Children.count(slides);
  const step = 100 / slidesPerView;
  const maxIndex = Math.max(0, count - slidesPerView);

  return (
    <section className={cn('w-full py-16', backgrounds[background], className)}>
      <div className="mx-auto max-w-7xl px-6">
        {(title || intro) && (
          <div className="mb-10 flex flex-col gap-3">
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <FormattedText className="max-w-2xl text-lg leading-relaxed opacity-80">
                {intro}
              </FormattedText>
            )}
          </div>
        )}

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * step}%)` }}
          >
            {Children.map(slides, (slide, i) => (
              <div
                key={i}
                className={cn('w-full shrink-0 px-3', perView[slidesPerView])}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {showArrows && count > slidesPerView && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setIndex((v) => Math.max(0, v - 1))}
              disabled={index === 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/30 disabled:opacity-30"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" />
              </svg>
            </button>
            <p className="text-sm tabular-nums opacity-70">
              {index + 1} / {maxIndex + 1}
            </p>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setIndex((v) => Math.min(maxIndex, v + 1))}
              disabled={index >= maxIndex}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/30 disabled:opacity-30"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Carousel;
