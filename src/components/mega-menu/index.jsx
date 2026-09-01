import { Children } from 'react';
import { cn } from 'drupal-canvas';

const columns = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

const MegaMenu = ({ columnCount = 3, sections, feature, className }) => (
  <div className={cn('flex w-full flex-col gap-8 lg:flex-row', className)}>
    <div
      className={cn(
        'grid flex-1 grid-cols-1 gap-8',
        columns[columnCount] || columns[3],
      )}
    >
      {sections}
    </div>
    {Children.count(feature) > 0 && (
      <div className="w-full shrink-0 rounded-xl bg-gray-50 p-5 lg:w-72">
        {feature}
      </div>
    )}
  </div>
);

export default MegaMenu;
