import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {}

export const Wrapper = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <div {...rest} className={`flex items-center justify-center py-12 px-4${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
};
