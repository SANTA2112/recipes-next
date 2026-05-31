import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  notFullWidth?: boolean;
}

export const Button = (props: Props) => {
  const { children, notFullWidth, ...rest } = props;
  return (
    <button
      {...rest}
      className={`${notFullWidth ? '' : 'w-full'} flex justify-center items-center gap-2 px-5 py-2.5 bg-linear-to-r from-orange-400 to-red-500 text-white rounded-full hover:shadow-lg transition-all duration-200 cursor-pointer`}
    >
      {children}
    </button>
  );
};
