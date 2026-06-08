import type { ComponentPropsWithoutRef, ComponentType, SVGProps } from 'react';

interface Props extends ComponentPropsWithoutRef<'input'> {
  labelText?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  noMargin?: boolean;
  isError?: boolean;
  message?: string;
}

export const Input = (props: Props) => {
  const { labelText, icon: Icon, className, noMargin, isError, message, ...rest } = props;
  const hasIconClass = Icon ? ' pl-12' : '';
  const isErrorClass = isError ? ' border-red-400' : '';
  return (
    <div className={`mb-${noMargin ? '0' : '4'} relative${className ? ` ${className}` : ''}`}>
      {labelText && <label className="block mb-2 font-medium text-gray-700">{labelText}</label>}
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
      <input
        {...rest}
        className={`w-full px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all outline-none${hasIconClass}${isErrorClass}`}
      />
      {message && <div className="text-red-400 text-right">{message}</div>}
    </div>
  );
};
