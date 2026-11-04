import { Children, useId } from 'react';
import { cn, FormattedText } from 'drupal-canvas';

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
};

const field =
  'w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500';

// `name` is the submitted field name; `id` is prefixed per form instance so two
// forms on one page do not share ids (which would bind labels to the wrong input).
const Field = ({ idPrefix, name, label, type = 'text', required, half }) => (
  <div
    className={cn(
      'flex flex-col gap-2',
      half ? 'sm:col-span-1' : 'sm:col-span-2',
    )}
  >
    <label htmlFor={`${idPrefix}-${name}`} className="text-sm font-semibold">
      {label}
      {required && <span aria-hidden="true"> *</span>}
    </label>
    <input
      id={`${idPrefix}-${name}`}
      name={name}
      type={type}
      required={required}
      className={field}
    />
  </div>
);

const ContactForm = ({
  title,
  intro,
  action,
  submitLabel = 'Send message',
  showCompany = true,
  showPhone = false,
  messageLabel = 'How can we help?',
  consentText,
  background = 'none',
  aside,
  className,
}) => {
  const idPrefix = useId();

  return (
    <section className={cn('w-full py-16', backgrounds[background], className)}>
      <div
        className={cn(
          'mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6',
          aside && 'lg:grid-cols-2 lg:gap-20',
        )}
      >
        <div className="flex flex-col gap-6">
          {(title || intro) && (
            <div className="flex flex-col gap-3">
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

          <form
            action={action || '/contact'}
            method="post"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <Field
              idPrefix={idPrefix}
              name="firstName"
              label="First name"
              required
              half
            />
            <Field
              idPrefix={idPrefix}
              name="lastName"
              label="Last name"
              required
              half
            />
            <Field
              idPrefix={idPrefix}
              name="email"
              label="Work email"
              type="email"
              required
              half
            />
            {showPhone && (
              <Field
                idPrefix={idPrefix}
                name="phone"
                label="Phone"
                type="tel"
                half
              />
            )}
            {showCompany && (
              <Field idPrefix={idPrefix} name="company" label="Company" half />
            )}

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor={`${idPrefix}-message`}
                className="text-sm font-semibold"
              >
                {messageLabel}
              </label>
              <textarea
                id={`${idPrefix}-message`}
                name="message"
                rows={5}
                className={field}
              />
            </div>

            {consentText && (
              <p className="text-xs leading-relaxed opacity-70 sm:col-span-2">
                {consentText}
              </p>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-md bg-primary-600 px-8 py-3 font-semibold text-white hover:bg-primary-700"
              >
                {submitLabel}
              </button>
            </div>
          </form>
        </div>

        {Children.count(aside) > 0 && (
          <div className="flex flex-col gap-6">{aside}</div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
