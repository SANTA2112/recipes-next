'use client';
import { useState } from 'react';
import { v7 as uuid } from 'uuid';

import PlusIcon from '@/assets/icons/plus.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { Input } from '@/components/ui/input';
import type { Filling } from '@/components/ui/recipe-editor/form';
import { IngredientItem } from '@/components/ui/recipe-editor/ingredient-item';
import { Textarea } from '@/components/ui/textarea';

interface Props extends Filling {
  deleteFilling?: () => void;
  showDeleteButton?: boolean;
}

export const FillingForm = (props: Props) => {
  const { description, title, deleteFilling, showDeleteButton } = props;
  const [ingredients, setIngredients] = useState(
    props.ingredients.length > 1 ? props.ingredients : [{ id: uuid(), count: '', title: '', unit: '' }],
  );

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { id: uuid(), count: '', title: '', unit: '' }]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mb-4 last:mb-0 border-b-gray-200 border-b-2 last:border-none pb-1 last:pb-0">
      <Input placeholder="Название" />
      <Textarea placeholder="Описание" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Ингредиенты</h3>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-xl transition-all font-medium cursor-pointer"
          onClick={handleAddIngredient}
        >
          <PlusIcon className="w-4 h-4" />
          <span>Добавить ингредиент</span>
        </button>
      </div>
      <div className="space-y-3">
        {ingredients.map((item) => (
          <IngredientItem
            key={item.id}
            {...item}
            handleDelete={() => handleRemoveIngredient(item.id)}
            showRemoveButton={ingredients.length > 1}
          />
        ))}
      </div>
      <div className="flex items-center justify-end">
        {showDeleteButton && (
          <button
            type="button"
            className="mt-4 flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium cursor-pointer"
            onClick={deleteFilling}
          >
            <span>Удалить</span>
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
