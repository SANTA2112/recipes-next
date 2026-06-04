import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  isActive?: boolean;
}

export const TabButton = (props: Props) => {
  const { isActive, children, ...rest } = props;

  const activeClass = isActive
    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white border-transparent shadow-md'
    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:shadow-sm';

  return (
    <button {...rest} className={`px-4 py-2 rounded-full border-2 transition-all font-medium ${activeClass}`}>
      {children}
    </button>
  );
};
