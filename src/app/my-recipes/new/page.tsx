import Link from 'next/link';

import { RecipeEditor } from '@/components/ui/recipe-editor/form';
import { Wrapper } from '@/components/common/wrapper';
import { ROUTES } from '@/constants';

export default async function NewRecipePage() {
  return (
    <Wrapper>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl">Создать рецепт</h1>
          <Link
            href={ROUTES.myrecipes}
            className="px-5 py-2.5 text-gray-600 hover:text-gray-800 transition-colors font-medium bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Назад к списку
          </Link>
        </div>
        <RecipeEditor />
      </div>
    </Wrapper>
  );
}
