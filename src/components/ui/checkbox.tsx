import CheckedIcon from '@/assets/icons/checked.svg';

interface Props {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export const Checkbox = (props: Props) => {
  const { checked, onChange, className, disabled, label, name } = props;

  return (
    <label className={`inline-flex items-center gap-3 select-none cursor-pointer${className ? ` ${className}` : ''}`}>
      <div className="relative h-5 w-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="peer hidden"
          name={name}
        />
        <div className="absolute inset-0 rounded-md border transition-all duration-200 border-zinc-400 bg-white peer-checked:border-orange-600 peer-checked:bg-orange-600 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 peer-focus-visible:ring-offset-2 peer-disabled:bg-zinc-100"></div>
        <CheckedIcon className="absolute inset-0.5 opacity-0 peer-checked:opacity-100 transition-all duration-200" />
      </div>

      {label && <span className="text-2xl font-semibold text-gray-800">{label}</span>}
    </label>
  );
};
