import { Children, useEffect, useState } from 'react';
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

// Mirrors the `perView` breakpoints above (sm = 640px, lg = 1024px) so the
// slide offset and the last reachable index match what is actually rendered.
const useVisibleSlides = (slidesPerView) => {
  const [visible, setVisible] = useState(slidesPerView);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisible(1);
      } else if (width < 1024) {
        setVisible(Math.min(slidesPerView, 2));
      } else {
        setVisible(slidesPerView);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [slidesPerView]);

  return visible;
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
  const [requestedIndex, setIndex] = useState(0);
  const count = Children.count(slides);
  const visible = useVisibleSlides(slidesPerView);
  const step = 100 / visible;
  const maxIndex = Math.max(0, count - visible);
  // Clamp so shrinking the slide list or widening the viewport never leaves
  // the track scrolled past the last slide.
  const index = Math.min(requestedIndex, maxIndex);

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

        {showArrows && count > visible && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setIndex(Math.max(0, index - 1))}
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
              onClick={() => setIndex(Math.min(maxIndex, index + 1))}
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
