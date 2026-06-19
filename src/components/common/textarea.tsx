import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'textarea'> {
  labelText?: string;
  className?: string;
  noMargin?: boolean;
  isError?: boolean;
  message?: string;
}

export const Textarea = (props: Props) => {
  const { labelText, className, noMargin, isError, message, disabled, ...rest } = props;
  const isErrorClass = isError ? ' border-red-400' : '';
  const disabledClass = disabled ? ' cursor-not-allowed opacity-60' : '';
  return (
    <div className={`mb-${noMargin ? '0' : '4'} relative${className ? ` ${className}` : ''}`}>
      {labelText && <label className="block mb-2 font-medium text-gray-700">{labelText}</label>}
      <textarea
        {...rest}
        disabled={disabled}
        className={`w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none resize-none${isErrorClass}${disabledClass}`}
        rows={3}
      ></textarea>
      {message && <div className="text-red-400 text-right">{message}</div>}
    </div>
  );
};
