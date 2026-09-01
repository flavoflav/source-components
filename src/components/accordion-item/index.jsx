import { useState } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const AccordionItem = ({
  question,
  answer,
  defaultOpen = false,
  className,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  if (!question) {
    return null;
  }

  return (
    <div className={cn('w-full', className)}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold"
        >
          <span>{question}</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn(
              'h-5 w-5 shrink-0 transition-transform',
              open && 'rotate-45',
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </button>
      </h3>
      {open && answer && (
        <FormattedText className="pb-6 leading-relaxed opacity-80 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5">
          {answer}
        </FormattedText>
      )}
    </div>
  );
};

export default AccordionItem;
