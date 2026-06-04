'use client';
import Link from 'next/link';
import { useState } from 'react';
import { v7 as uuid } from 'uuid';

import SaveIcon from '@/assets/icons/save.svg';
import { AddBlockButton } from '@/components/common/buttons/add-block';
import { Button } from '@/components/common/buttons/button';
import { Checkbox } from '@/components/common/checkbox';
import { FillingForm } from '@/components/ui/recipe-editor/filling';
import { IngredietnsForm } from '@/components/ui/recipe-editor/ingredietns';
import { MainForm } from '@/components/ui/recipe-editor/main';
import { Stepper } from '@/components/ui/recipe-editor/stepper';
import { ROUTES } from '@/constants';

export interface Ingredient {
  id: string;
  title: string;
  count: string;
  unit: string;
}

export interface Filling {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
}

export interface Instruction {
  id: string;
  value: string;
}

interface Recipe {
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string | null;
  servings: number;
  cookTime: number;
  ingredients: Ingredient[];
  sauses: Filling[];
  filling: Filling[];
  instructions: Instruction[];
}

interface Props extends Partial<Recipe> {}

export const RecipeEditor = (props: Props) => {
  const { cookTime, fullDesc, image, servings, shortDesc, title, ingredients = [], instructions = [] } = props;
  const [checkedFilling, setCheckedFilling] = useState((props.filling ?? [])?.length > 1);
  const [checkedSauses, setCheckedSauses] = useState((props.sauses ?? []).length > 1);
  const [filling, setFilling] = useState([{ id: uuid(), title: '', description: '', ingredients: [] }]);
  const [sauses, setSauses] = useState([{ id: uuid(), title: '', description: '', ingredients: [] }]);

  const handleAddFilling = (type: 'filling' | 'sauses') => {
    if (type === 'filling')
      setFilling((prev) => [...prev, { id: uuid(), title: '', description: '', ingredients: [] }]);
    if (type === 'sauses') setSauses((prev) => [...prev, { id: uuid(), title: '', description: '', ingredients: [] }]);
  };

  const handleDeleteFilling = (type: 'filling' | 'sauses', id: string) => {
    if (type === 'filling') setFilling((prev) => prev.filter((item) => item.id !== id));
    if (type === 'sauses') setSauses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <form className="space-y-6">
      <MainForm
        cookTime={cookTime}
        fullDesc={fullDesc}
        image={image ?? ''}
        servings={servings}
        shortDesc={shortDesc}
        title={title}
      />
      <IngredietnsForm heading="Ингредиенты" ingredients={ingredients} />
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-4">
          <Checkbox label="Добавить начинки" checked={checkedFilling} onChange={setCheckedFilling} />
          {checkedFilling && (
            <AddBlockButton onClick={() => handleAddFilling('filling')}>Добавить начинку</AddBlockButton>
          )}
        </div>
        {checkedFilling &&
          filling.map((fill) => (
            <FillingForm
              key={fill.id}
              {...fill}
              deleteFilling={() => handleDeleteFilling('filling', fill.id)}
              showDeleteButton={filling.length > 1}
            />
          ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-4">
          <Checkbox label="Добавить соуса" checked={checkedSauses} onChange={setCheckedSauses} />
          {checkedSauses && <AddBlockButton onClick={() => handleAddFilling('sauses')}>Добавить соус</AddBlockButton>}
        </div>
        {checkedSauses &&
          sauses.map((fill) => (
            <FillingForm
              key={fill.id}
              {...fill}
              deleteFilling={() => handleDeleteFilling('sauses', fill.id)}
              showDeleteButton={sauses.length > 1}
            />
          ))}
      </div>
      <Stepper instructions={instructions} />
      <div className="flex gap-4">
        <Button type="submit">
          <SaveIcon className="w-5 h-5" />
          <span>Сохранить рецепт</span>
        </Button>
        <Link
          href={ROUTES.myrecipes}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all font-medium"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
};
