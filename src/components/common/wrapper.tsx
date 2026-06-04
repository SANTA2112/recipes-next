import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {}

export const Wrapper = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <div {...rest} className={`container mx-auto px-4 py-12${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
};
