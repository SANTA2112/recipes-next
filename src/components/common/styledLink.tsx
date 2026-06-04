import Link, { type LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends LinkProps, Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  className?: string;
}

const StyledLink = (props: Props) => {
  const { children, className, ...rest } = props;

  return (
    <Link
      {...rest}
      className={`text-gray-700 hover:text-orange-600 transition-colors font-medium${className ? ` ${className}` : ''}`}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
