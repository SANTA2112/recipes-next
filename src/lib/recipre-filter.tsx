'use client';
import { Input } from '@/components/ui/input';

import SearchIcon from '@/assets/icons/search.svg';
import FilterIcon from '@/assets/icons/filter.svg';
import { popularIngredients } from '@/constants';
import { TabButton } from '@/components/ui/buttons/tab';
import { useState } from 'react';

export const RecipesFilter = () => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const handleChangeIsOpenFilters = () => {
    setIsOpenFilters((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input noMargin className="w-full" icon={SearchIcon} />
        <button
          className="flex items-center gap-2 px-6 py-3.5 md:py-0 bg-white border-2 border-gray-200 rounded-2xl hover:border-orange-300 hover:shadow-md transition-all"
          onClick={handleChangeIsOpenFilters}
        >
          <FilterIcon className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Фильтры</span>
          <span className="ml-2 px-2.5 py-0.5 bg-linear-to-r from-orange-400 to-red-500 text-white text-sm rounded-full shadow-sm">
            10
          </span>
        </button>
      </div>
      {isOpenFilters && (
        <div className="mt-4 p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-800">Популярные ингредиенты:</h3>
          <div className="flex flex-wrap gap-2.5">
            {popularIngredients.map((item, i) => (
              <TabButton key={i}>{item}</TabButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
