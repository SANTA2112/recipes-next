'use client';

import { useState } from 'react';

import { Button } from '@/components/common/buttons/button';
import { RecipesFilter } from '@/components/recipe-filter';
import { Recipe as RecipeComponent } from '@/components/ui/cards/recipe';
import { ROUTES } from '@/constants';
import type { Recipe } from '@/generated/prisma/client';
import { useFilter } from '@/hooks/useFilter';

interface Props {
  recipes: Recipe[];
}

export const RecipesView = (props: Props) => {
  const { recipes } = props;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { activeFilters, filtered, handleChangeFilter, handleResetFilters } = useFilter(recipes, searchQuery.trim());

  return (
    <div>
      <RecipesFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilters={activeFilters}
        handleChangeFilter={handleChangeFilter}
      />
      {recipes.length === 0 && <div className="flex justify-center items-center text-2xl">Список рецептов пуст</div>}
      {filtered.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="text-2xl">Ничего не найдено</div>
          <Button onClick={handleResetFilters} notFullWidth>
            Сборосить фильтры
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(({ id, ...recipe }) => (
          <a key={id} href={`${ROUTES.recipe(id.toString())}`}>
            <RecipeComponent {...recipe} />
          </a>
        ))}
      </div>
    </div>
  );
};
