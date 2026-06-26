'use client';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { AddBlockButton } from '@/components/common/buttons/add-block';
import { IngredientItem } from '@/components/ui/recipe-editor/ingredient-item';
import type { RecipeFormState } from '@/constants/form-state.types';

interface Props {
  heading: string;
}

export const IngredietnsForm = (props: Props) => {
  const fieldName = 'ingredients';
  const { heading } = props;
  const { control } = useFormContext<Pick<RecipeFormState, 'ingredients'>>();
  const { fields, append, remove } = useFieldArray({ control, name: fieldName });

  const handleAddIngredient = () => {
    append({ count: '', title: '', unit: '' });
  };

  const handleRemoveIngredient = (id: number) => {
    remove(id);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
      <h2 className="text-2xl mb-4 font-semibold text-gray-800">{heading}</h2>
      <div className="space-y-3">
        {fields.map((item, index) => (
          <IngredientItem
            key={item.id}
            showRemoveButton={fields.length > 1}
            handleDelete={() => handleRemoveIngredient(index)}
            index={index}
            fieldName={fieldName}
          />
        ))}
      </div>
      <AddBlockButton onClick={handleAddIngredient} className="mt-4 ml-auto">
        Добавить ингредиент
      </AddBlockButton>
    </div>
  );
};
