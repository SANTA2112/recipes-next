import { RecipesFilter } from '@/app/lib/recipreFilter';
import { Recipe } from '@/components/ui/cards/recipe';
import { Wrapper } from '@/components/ui/wrapper';

const Recipes = () => {
  const recipes = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <Wrapper>
      <h1 className="text-4xl mb-6">Рецепты русской кухни</h1>
      <RecipesFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((item) => (
          <Recipe
            key={item}
            title="Борщ классический"
            shortDesc="Традиционный украинский борщ с говядиной и сметаной"
            cookTime={90}
            portions={1}
            image="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800"
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Recipes;
