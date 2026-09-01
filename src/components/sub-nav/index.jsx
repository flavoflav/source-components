import { cn } from 'drupal-canvas';

const SubNav = ({
  productLabel,
  productUrl,
  sticky = true,
  variant = 'light',
  items,
  actions,
  className,
}) => (
  <div
    className={cn(
      'z-30 w-full border-b',
      sticky && 'sticky top-0',
      variant === 'dark'
        ? 'border-white/15 bg-gray-900 text-white'
        : 'border-gray-200 bg-white text-gray-900',
      className,
    )}
  >
    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-3">
      {productLabel && (
        <a
          href={productUrl || '/'}
          className="text-base font-semibold tracking-tight"
        >
          {productLabel}
        </a>
      )}
      <ul className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2">
        {items}
      </ul>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  </div>
);

export default SubNav;
