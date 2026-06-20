'use client';
import { useMemo, useState } from 'react';

import MinusIcon from '@/assets/icons/minus.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { CalcButton } from '@/components/common/buttons/calc';
import type { Recipe } from '@/constants/form-state';
import { formatServings } from '@/utils/format';

interface Props extends Pick<Recipe, 'ingredients' | 'servings'> {}

export const RecipeCalc = (props: Props) => {
  const [servings, setServings] = useState(Number(props.servings) ?? 1);
  const ingredients = useMemo(
    () =>
      props.ingredients.map((item) => ({
        ...item,
        count: parseFloat((Number(item.count) * (Number(servings) / Number(props.servings))).toFixed(1)),
      })),
    [servings, props.servings, props.ingredients],
  );

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-2xl mb-4 font-semibold text-gray-800">Ингредиенты</h2>
        <div className="mb-6 p-5 bg-linear-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-100">
          <div className="flex items-center justify-center gap-3 flex-col">
            <span className="text-gray-700 font-medium">Количество порций:</span>
            <div className="flex items-center justify-center">
              <CalcButton onClick={() => setServings((prev) => prev - 1)} disabled={servings < 2}>
                <MinusIcon className="w-4 h-4 text-orange-600" />
              </CalcButton>
              <span className="text-2xl font-bold w-12 text-center bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {servings}
              </span>
              <CalcButton onClick={() => setServings((prev) => prev + 1)}>
                <PlusIcon className="w-4 h-4 text-orange-600" />
              </CalcButton>
            </div>
          </div>
          {props.servings !== servings && (
            <p className="text-sm text-gray-600 text-center mt-2">
              Оригинальный рецепт на {formatServings(Number(props.servings))}
            </p>
          )}
        </div>
        <ul className="space-y-3">
          {ingredients.map(({ count, title, unit }) => (
            <li key={title} className="flex justify-between items-center">
              <span className="text-gray-700">{title}</span>
              <span className="text-gray-500 font-medium">
                {count} {unit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
