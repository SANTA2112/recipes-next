import Link from 'next/link';

import PlusIcon from '@/assets/icons/plus.svg';
import { Button } from '@/components/common/buttons/button';
import { Heading } from '@/components/common/heading';
import { Wrapper } from '@/components/common/wrapper';
import { Recipe } from '@/components/ui/cards/recipe';
import { ROUTES } from '@/constants';

const MyRecipesPage = () => {
  const recipes = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <Wrapper>
      <div className="mb-6 flex flex-col items-end">
        <Heading>Мои рецепты</Heading>
        <Link href={ROUTES.newRecipe}>
          <Button notFullWidth>
            <PlusIcon className="w-5 h-5" />
            <span>Создать новый рецепт</span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((item) => (
          <Recipe
            key={item}
            title="Борщ классический"
            shortDesc="Традиционный украинский борщ с говядиной и сметаной"
            cookTime={90}
            servings={1}
            image="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800"
            slug={item.toString()}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default MyRecipesPage;
