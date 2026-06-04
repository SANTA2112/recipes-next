import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'h1'> {}

export const Heading = (props: Props) => {
  const { children, ...rest } = props;

  return (
    <h1 {...rest} className="text-4xl mb-6 text-center self-center">
      {children}
    </h1>
  );
};
