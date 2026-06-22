import { notFound } from 'next/navigation';

import { getRecipeById } from '@/actions/recipe';
import { Wrapper } from '@/components/common/wrapper';
import { RecipeEditor } from '@/components/ui/recipe-editor/form';
import { ROUTES } from '@/constants';
import { notifyError } from '@/utils/toasts';

export default async function MyRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, recipe } = await getRecipeById({ id });

  if (error) {
    notifyError(error);
  }

  if (!recipe) notFound();

  return (
    <Wrapper>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl">Редактировать рецепт</h1>
          <a
            href={ROUTES.myrecipes}
            className="px-5 py-2.5 text-gray-600 hover:text-gray-800 transition-colors font-medium bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Назад к списку
          </a>
        </div>
        <RecipeEditor {...recipe} />
      </div>
    </Wrapper>
  );
}
