'use client';
import { useState } from 'react';
import { v7 as uuid } from 'uuid';

import { AddBlockButton } from '@/components/common/buttons/add-block';
import { DeleteButton } from '@/components/common/buttons/delete';
import { Input } from '@/components/common/input';
import type { Filling } from '@/components/ui/recipe-editor/form';
import { IngredientItem } from '@/components/ui/recipe-editor/ingredient-item';
import { Textarea } from '@/components/common/textarea';

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
        <AddBlockButton onClick={handleAddIngredient}>Добавить ингредиент</AddBlockButton>
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
          <DeleteButton onClick={deleteFilling} className="mt-4">
            Удалить
          </DeleteButton>
        )}
      </div>
    </div>
  );
};
