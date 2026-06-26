import { useFieldArray, useFormContext } from 'react-hook-form';

import { AddBlockButton } from '@/components/common/buttons/add-block';
import { StepperItem } from '@/components/ui/recipe-editor/stepper-item';
import type { RecipeFormState } from '@/constants/form-state.types';

export const Stepper = () => {
  const fieldName = 'instructions';
  const { control } = useFormContext<Pick<RecipeFormState, 'instructions'>>();
  const { append, fields, remove } = useFieldArray({ control, name: fieldName });

  const handleAddInstruction = () => {
    append({ value: '' });
  };

  const handleRemoveInstruction = (id: number) => {
    remove(id);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
      <h2 className="text-2xl mb-4 font-semibold text-gray-800">Шаги приготовления</h2>
      <div className="space-y-4">
        {fields.map((item, index) => (
          <StepperItem
            key={item.id}
            index={index}
            handleDelete={() => handleRemoveInstruction(index)}
            showRemoveButton={fields.length > 1}
            fieldName={fieldName}
          />
        ))}
      </div>
      <AddBlockButton onClick={handleAddInstruction} className="ml-auto">
        Добавить шаг
      </AddBlockButton>
    </div>
  );
};
