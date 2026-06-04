import type { ComponentPropsWithoutRef } from 'react';

import TrashIcon from '@/assets/icons/trash.svg';

interface Props extends ComponentPropsWithoutRef<'button'> {}

export const DeleteButton = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <button
      {...rest}
      type="button"
      className={`flex items-center justify-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer${className ? ` ${className}` : ''}`}
    >
      {children && <span>{children}</span>}
      <TrashIcon className="w-4 h-4" />
    </button>
  );
};
