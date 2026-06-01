import { RecipesFilter } from '@/app/lib/recipre-filter';
import { Recipe } from '@/components/ui/cards/recipe';
import { Wrapper } from '@/components/ui/wrapper';
import { ROUTES } from '@/constants';
import Link from 'next/link';

const RecipesPage = () => {
  const recipes = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <Wrapper>
      <h1 className="text-4xl mb-6">Рецепты русской кухни</h1>
      <RecipesFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((item) => (
          <Link key={item} href={`${ROUTES.recipe(item.toString())}`}>
            <Recipe
              title="Борщ классический"
              shortDesc="Традиционный украинский борщ с говядиной и сметаной"
              cookTime={90}
              servings={1}
              image="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800"
            />
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default RecipesPage;
