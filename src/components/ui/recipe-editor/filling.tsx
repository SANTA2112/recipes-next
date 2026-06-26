import { useFieldArray, useFormContext } from 'react-hook-form';

import { AddBlockButton } from '@/components/common/buttons/add-block';
import { DeleteButton } from '@/components/common/buttons/delete';
import { Input } from '@/components/common/input';
import { Textarea } from '@/components/common/textarea';
import type { FillingsKeysNames } from '@/components/ui/recipe-editor/form';
import { IngredientItem } from '@/components/ui/recipe-editor/ingredient-item';
import type { Filling, RecipeFormState } from '@/constants/form-state.types';

interface Props {
  deleteFilling?: () => void;
  showDeleteButton?: boolean;
  fieldName: `${Extract<keyof RecipeFormState, 'filling' | 'sauses'>}.${number}`;
  index: number;
  originalKey: FillingsKeysNames;
}

type MainKey = `${Props['fieldName']}.${Exclude<keyof Filling, 'ingredients'>}`;

export type InnerKeyName =
  `${Extract<keyof RecipeFormState, 'filling' | 'sauses'>}.${number}.${Extract<keyof Filling, 'ingredients'>}`;

export const FillingForm = (props: Props) => {
  const { deleteFilling, showDeleteButton, fieldName, index, originalKey } = props;
  const innerFieldName: InnerKeyName = `${fieldName}.ingredients`;
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<Pick<RecipeFormState, 'filling' | 'sauses'>>();
  const { fields, append, remove } = useFieldArray({ control, name: innerFieldName });
  const fieldKeys: Exclude<keyof Filling, 'ingredients'>[] = ['title', 'description'];
  const [titleKey, descriptionKey] = fieldKeys.map((key) => `${fieldName}.${key}` as MainKey);

  const handleAddIngredient = () => {
    append({ count: '', title: '', unit: '' });
  };

  const handleRemoveIngredient = (index: number) => {
    remove(index);
  };

  return (
    <div className="mb-4 last:mb-0 border-b-gray-200 border-b-2 last:border-none pb-1 last:pb-0">
      <Input
        disabled={isSubmitting}
        placeholder="Название"
        isError={Boolean(errors?.[originalKey]?.[index]?.title?.message)}
        message={errors?.[originalKey]?.[index]?.title?.message || ''}
        {...register(titleKey, { required: { value: true, message: 'Это поле обязательное' } })}
      />
      <Textarea
        disabled={isSubmitting}
        placeholder="Описание"
        isError={Boolean(errors?.[originalKey]?.[index]?.description?.message)}
        message={errors?.[originalKey]?.[index]?.description?.message || ''}
        {...register(descriptionKey, { required: { value: true, message: 'Это поле обязательное' } })}
      />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Ингредиенты</h3>
        <AddBlockButton onClick={handleAddIngredient}>Добавить ингредиент</AddBlockButton>
      </div>
      <div className="space-y-3">
        {fields.map((item, idx) => (
          <IngredientItem
            key={item.id}
            handleDelete={() => handleRemoveIngredient(idx)}
            showRemoveButton={fields.length > 1}
            index={idx}
            fieldName={innerFieldName}
            {...item}
          />
        ))}
      </div>
      <div className="flex items-center justify-end">
        {showDeleteButton && (
          <DeleteButton onClick={deleteFilling} className="mt-4">
            Удалить
          </DeleteButton>
        )}
      </div>
    </div>
  );
};
