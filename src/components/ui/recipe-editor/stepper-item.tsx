import { useFormContext } from 'react-hook-form';

import { DeleteButton } from '@/components/common/buttons/delete';
import { Textarea } from '@/components/common/textarea';
import type { RecipeFormState } from '@/constants/form-state';

interface Props {
  index: number;
  handleDelete?: () => void;
  showRemoveButton?: boolean;
  fieldName: Extract<keyof RecipeFormState, 'instructions'>;
}

export const StepperItem = (props: Props) => {
  const { index, handleDelete, showRemoveButton, fieldName } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext<Pick<RecipeFormState, Props['fieldName']>>();
  return (
    <div className="grid grid-cols-[40px_1fr_45px] gap-3 items-start">
      <div className="shrink-0 h-10 bg-linear-to-br from-orange-400 to-red-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-md mt-1">
        {index + 1}
      </div>
      <Textarea
        noMargin
        placeholder={`Опишите шаг ${index + 1}...`}
        isError={Boolean(errors.instructions?.[index]?.message)}
        message={errors.instructions?.[index]?.message || ''}
        {...register(`${fieldName}.${index}.value`, { required: { value: true, message: 'Это поле обязательно' } })}
      />
      {showRemoveButton && <DeleteButton onClick={handleDelete} />}
    </div>
  );
};
