import { useMemo, useState } from 'react';

import type { Recipe } from '@/constants/form-state';
import type { Recipe as PrismaRecipe } from '@/generated/prisma/client';

export const useFilter = (recipes: PrismaRecipe[], query: string) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleChangeFilter = (filterItem: string) => {
    if (activeFilters.includes(filterItem)) {
      setActiveFilters((prev) => prev.filter((el) => el !== filterItem));
    } else {
      setActiveFilters((prev) => [...prev, filterItem]);
    }
  };

  const handleResetFilters = () => {
    setActiveFilters([]);
  };

  const filtered = useMemo(
    () =>
      recipes
        .filter((recipe) =>
          recipe.title.toLowerCase().replaceAll(/ё/g, 'е').includes(query.toLowerCase().replaceAll(/ё/g, 'е')),
        )
        .filter((recipe) => {
          const ingredients = recipe.ingredients as unknown as Recipe['ingredients'];
          if (ingredients.length > 0 && activeFilters.length > 0) {
            console.log(ingredients, activeFilters);
            return activeFilters.every((filterItem) =>
              ingredients.find(
                (ingredient) =>
                  ingredient.title.toLowerCase().replaceAll(/ё/g, 'е') ===
                  filterItem.toLowerCase().replaceAll(/ё/g, 'е'),
              ),
            );
          }
          return true;
        }),
    [activeFilters, query, recipes],
  );

  return { activeFilters, handleChangeFilter, handleResetFilters, filtered };
};
