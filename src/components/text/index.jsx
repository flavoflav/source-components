import { cn, FormattedText } from 'drupal-canvas';

const sizes = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  extra_large: 'text-xl',
};

const aligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const Text = ({ content, size = 'medium', align = 'left', className }) => {
  if (!content) {
    return null;
  }

  return (
    <FormattedText
      className={cn(
        'prose max-w-none leading-relaxed [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6',
        sizes[size],
        aligns[align],
        className,
      )}
    >
      {content}
    </FormattedText>
  );
};

export default Text;
