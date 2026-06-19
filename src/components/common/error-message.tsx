import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {}

export const ErrorMessage = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <div {...rest} className="mt-1 text-red-500 font-bold text-center">
      {children}
    </div>
  );
};
