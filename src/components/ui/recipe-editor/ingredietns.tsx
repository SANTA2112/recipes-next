'use client';
import { useState } from 'react';
import { v7 as uuid } from 'uuid';

import PlusIcon from '@/assets/icons/plus.svg';
import type { Ingredient } from '@/components/ui/recipe-editor/form';
import { IngredientItem } from '@/components/ui/recipe-editor/ingredient-item';

interface Props {
  ingredients: Ingredient[];
  heading: string;
}

export const IngredietnsForm = (props: Props) => {
  const { heading } = props;
  const [ingredients, setIngredients] = useState(
    props.ingredients?.length > 1 ? props.ingredients : [{ id: uuid(), count: '', title: '', unit: '' }],
  );

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { id: uuid(), count: '', title: '', unit: '' }]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
      <h2 className="text-2xl mb-4 font-semibold text-gray-800">{heading}</h2>
      <div className="space-y-3">
        {ingredients.map((item) => (
          <IngredientItem
            key={item.id}
            handleDelete={() => handleRemoveIngredient(item.id)}
            showRemoveButton={ingredients.length > 1}
            {...item}
          />
        ))}
      </div>
      <button
        type="button"
        className="mt-4 flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-xl transition-all font-medium cursor-pointer"
        onClick={handleAddIngredient}
      >
        <PlusIcon className="w-4 h-4" />
        <span>Добавить ингредиент</span>
      </button>
    </div>
  );
};
