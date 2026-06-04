import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'textarea'> {
  labelText?: string;
  className?: string;
  noMargin?: boolean;
}

export const Textarea = (props: Props) => {
  const { labelText, className, noMargin, ...rest } = props;
  return (
    <div className={`mb-${noMargin ? '0' : '4'} relative${className ? ` ${className}` : ''}`}>
      {labelText && <label className="block mb-2 font-medium text-gray-700">{labelText}</label>}
      <textarea
        {...rest}
        className={`w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none resize-none`}
        rows={3}
      ></textarea>
    </div>
  );
};
