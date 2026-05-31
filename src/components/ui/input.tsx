import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'input'> {
  labelText?: string;
}

export const Input = (props: Props) => {
  const { labelText, ...rest } = props;
  return (
    <div className="mb-4">
      {labelText && <label className="block mb-2 font-medium text-gray-700">{labelText}</label>}
      <input
        {...rest}
        className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none"
      />
    </div>
  );
};
