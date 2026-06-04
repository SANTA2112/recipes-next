import Link from 'next/link';

import { Recipe } from '@/components/ui/cards/recipe';
import { Heading } from '@/components/common/heading';
import { Wrapper } from '@/components/common/wrapper';
import { ROUTES } from '@/constants';
import { RecipesFilter } from '@/lib/recipre-filter';

const RecipesPage = () => {
  const recipes = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <Wrapper>
      <Heading>Рецепты русской кухни</Heading>
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
