import type { ComponentPropsWithoutRef } from 'react';

import PlusIcon from '@/assets/icons/plus.svg';

interface Props extends ComponentPropsWithoutRef<'button'> {}

export const AddBlockButton = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <button
      {...rest}
      type="button"
      className={`flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-xl transition-all font-medium cursor-pointer${className ? ` ${className}` : ''}`}
    >
      <PlusIcon className="w-4 h-4" />
      <span>{children}</span>
    </button>
  );
};
