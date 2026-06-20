import { getUserRecipes } from '@/actions/recipe';
import PlusIcon from '@/assets/icons/plus.svg';
import { Button } from '@/components/common/buttons/button';
import { ErrorMessage } from '@/components/common/error-message';
import { Heading } from '@/components/common/heading';
import { Wrapper } from '@/components/common/wrapper';
import { Recipe } from '@/components/ui/cards/recipe';
import { ROUTES } from '@/constants';

const MyRecipesPage = async () => {
  const { error, recipes = [] } = await getUserRecipes();
  return (
    <Wrapper>
      <div className="mb-6 flex flex-col items-end">
        <Heading>Мои рецепты</Heading>
        <a href={ROUTES.newRecipe}>
          <Button notFullWidth>
            <PlusIcon className="w-5 h-5" />
            <span>Создать новый рецепт</span>
          </Button>
        </a>
      </div>
      {recipes.length === 0 && <div className="flex justify-center items-center text-2xl">Список рецептов пуст</div>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((item) => (
          <Recipe key={item.id} {...item} />
        ))}
      </div>
    </Wrapper>
  );
};

export default MyRecipesPage;
