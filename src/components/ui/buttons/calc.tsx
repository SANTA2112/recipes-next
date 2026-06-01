import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {}

export const CalcButton = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className="w-10 h-10 flex items-center justify-center bg-white border-2 border-orange-200 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
    >
      {children}
    </button>
  );
};
