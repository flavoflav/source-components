import { useState } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const widths = {
  narrow: 'max-w-3xl',
  content: 'max-w-5xl',
  wide: 'max-w-7xl',
};

const VideoEmbed = ({
  videoUrl,
  title,
  caption,
  posterImage,
  width = 'content',
  className,
}) => {
  const [playing, setPlaying] = useState(false);
  const showPoster = Boolean(posterImage?.src) && !playing;

  if (!videoUrl) {
    return null;
  }

  return (
    <figure className={cn('mx-auto w-full px-6', widths[width], className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
        {showPoster ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play ${title || 'video'}`}
          >
            <img
              src={posterImage.src}
              alt={posterImage.alt || ''}
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-gray-900/30 transition-colors group-hover:bg-gray-900/45">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-gray-900">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="ml-1 h-6 w-6"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        ) : (
          <iframe
            src={
              playing
                ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1`
                : videoUrl
            }
            title={title || 'Embedded video'}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {caption && (
        <FormattedText className="mt-3 text-sm opacity-70">
          {caption}
        </FormattedText>
      )}
    </figure>
  );
};

export default VideoEmbed;
