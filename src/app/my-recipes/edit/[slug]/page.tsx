import Link from 'next/link';
import { notFound } from 'next/navigation';

import { RecipeEditor } from '@/components/ui/recipe-editor/form';
import { Wrapper } from '@/components/common/wrapper';
import { ROUTES } from '@/constants';

async function getRecipe(slug: string) {
  return { slug };
}

export default async function MyRecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) notFound();

  return (
    <Wrapper>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl">Редактировать рецепт</h1>
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
