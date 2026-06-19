import { useFormContext } from 'react-hook-form';

import { DeleteButton } from '@/components/common/buttons/delete';
import { Input } from '@/components/common/input';
import type { InnerKeyName } from '@/components/ui/recipe-editor/filling';
import type { Ingredient, RecipeFormState } from '@/constants/form-state';

interface Props {
  showRemoveButton?: boolean;
  handleDelete?: () => void;
  index: number;
  fieldName: InnerKeyName | `ingredients`;
}

type RegisterFieldName = `${Props['fieldName']}.${number}.${keyof Ingredient}`;

export const IngredientItem = (props: Props) => {
  const { handleDelete, showRemoveButton, index, fieldName } = props;
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<Pick<RecipeFormState, 'ingredients' | 'sauses' | 'filling'>>();
  const keyNames = ['title', 'count', 'unit'] as const;
  const [titleKey, countKey, unitKey] = keyNames.map((key) => `${fieldName}.${index}.${key}` as RegisterFieldName);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[60%_1fr_1fr_45px] gap-4">
        <Input disabled={isSubmitting} noMargin placeholder="Название ингредиента" required {...register(titleKey)} />
        <Input
          disabled={isSubmitting}
          noMargin
          placeholder="Кол-во"
          type="number"
          required
          {...register(countKey, { valueAsNumber: true })}
        />
        <Input disabled={isSubmitting} noMargin placeholder="г. / ст.л." required {...register(unitKey)} />
        {showRemoveButton && <DeleteButton onClick={handleDelete} />}
      </div>
    </div>
  );
};
