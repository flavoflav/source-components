import { useState } from 'react';
import { cn } from 'drupal-canvas';

const heights = {
  auto: '',
  small: 'h-64 overflow-y-auto',
  medium: 'h-[28rem] overflow-y-auto',
  large: 'h-[40rem] overflow-y-auto',
};

const scales = { actual: 1, three_quarter: 0.75, half: 0.5 };

const ComponentPreview = ({
  label,
  scale = 'actual',
  height = 'auto',
  ground = 'page',
  allowInteraction = true,
  content,
  className,
}) => {
  const [live, setLive] = useState(false);
  const zoom = scales[scale] ?? 1;

  return (
    <figure
      className={cn(
        'w-full overflow-hidden rounded-md border border-gray-200',
        className,
      )}
    >
      <figcaption className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <span className="font-mono text-xs text-gray-600">
          {label || 'Preview'}
        </span>
        {zoom !== 1 && (
          <span className="font-mono text-[0.65rem] text-gray-400">
            {Math.round(zoom * 100)}%
          </span>
        )}
        {allowInteraction && (
          <button
            type="button"
            onClick={() => setLive((v) => !v)}
            aria-pressed={live}
            className={cn(
              'ml-auto rounded border px-2 py-1 font-mono text-xs',
              live
                ? 'border-primary-500 bg-primary-100 text-primary-800'
                : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-700',
            )}
          >
            {live ? 'Interactive' : 'Interact'}
          </button>
        )}
      </figcaption>

      {/*
       * The containment box. `contain` plus a transform makes this element a
       * containing block, so a sticky or fixed child - site-header, sub-nav,
       * announcement-bar - is trapped here instead of escaping onto the page.
       * `inert` keeps a preview from acting on the real document until asked,
       * so an interactive component cannot fire from a preview by accident.
       */}
      <div
        className={cn('relative bg-white', heights[height])}
        style={{ contain: 'layout paint style', transform: 'translateZ(0)' }}
      >
        <div
          inert={!live && allowInteraction ? true : undefined}
          style={zoom === 1 ? undefined : { zoom }}
          className={cn(ground === 'surface' && 'p-6')}
        >
          {content}
        </div>
      </div>
    </figure>
  );
};

export default ComponentPreview;
