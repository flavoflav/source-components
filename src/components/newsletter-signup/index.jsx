import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
  primary: 'bg-primary-700 text-white',
};

const NewsletterSignup = ({
  title,
  body,
  action,
  emailFieldName = 'email',
  placeholder = 'you@company.com',
  buttonLabel = 'Subscribe',
  consentText,
  background = 'light',
  layout = 'inline',
  className,
}) => (
  <section className={cn('w-full py-16', backgrounds[background], className)}>
    <div
      className={cn(
        'mx-auto max-w-5xl px-6',
        layout === 'inline'
          ? 'flex flex-col gap-8 md:flex-row md:items-center md:justify-between'
          : 'flex max-w-2xl flex-col items-center gap-6 text-center',
      )}
    >
      <div className="flex max-w-xl flex-col gap-2">
        {title && (
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
        )}
        {body && (
          <FormattedText className="leading-relaxed opacity-80">
            {body}
          </FormattedText>
        )}
      </div>

      <form
        action={action || '/newsletter'}
        method="post"
        className="w-full max-w-md shrink-0"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor={`newsletter-${emailFieldName}`}>
            Email address
          </label>
          <input
            id={`newsletter-${emailFieldName}`}
            type="email"
            name={emailFieldName}
            required
            placeholder={placeholder}
            className="h-12 flex-1 rounded-md border border-gray-300 bg-white px-4 text-gray-900 focus:border-primary-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-md bg-primary-600 px-6 font-semibold text-white hover:bg-primary-700"
          >
            {buttonLabel}
          </button>
        </div>
        {consentText && (
          <p className="mt-3 text-xs leading-relaxed opacity-70">
            {consentText}
          </p>
        )}
      </form>
    </div>
  </section>
);

export default NewsletterSignup;
