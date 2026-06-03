import { useState } from 'react';
import { v7 as uuid } from 'uuid';

import PlusIcon from '@/assets/icons/plus.svg';
import type { Instruction } from '@/components/ui/recipe-editor/form';
import { StepperItem } from '@/components/ui/recipe-editor/stepper-item';

interface Props {
  instructions: Instruction[];
}

export const Stepper = (props: Props) => {
  const [instructions, setInstructions] = useState(
    props.instructions.length > 1 ? props.instructions : [{ id: uuid(), value: '' }],
  );

  const handleAddInstruction = () => {
    setInstructions((prev) => [...prev, { id: uuid(), value: '' }]);
  };

  const handleDeleteInstruction = (id: string) => {
    setInstructions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
      <h2 className="text-2xl mb-4 font-semibold text-gray-800">Шаги приготовления</h2>
      <div className="space-y-4">
        {instructions.map((item, i) => (
          <StepperItem
            key={item.id}
            index={i + 1}
            value={item.value}
            handleDelete={() => handleDeleteInstruction(item.id)}
            showRemoveButton={instructions.length > 1}
          />
        ))}
      </div>
      <button
        type="button"
        className="mt-4 flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-xl transition-all font-medium cursor-pointer ml-auto"
        onClick={handleAddInstruction}
      >
        <PlusIcon className="w-4 h-4" />
        <span>Добавить шаг</span>
      </button>
    </div>
  );
};
