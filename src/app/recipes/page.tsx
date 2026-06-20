import { getRecipes } from '@/actions/recipe';
import { ErrorMessage } from '@/components/common/error-message';
import { Heading } from '@/components/common/heading';
import { Pagination } from '@/components/common/pagination';
import { Wrapper } from '@/components/common/wrapper';
import { Recipe } from '@/components/ui/cards/recipe';
import { ROUTES } from '@/constants';
import { RecipesFilter } from '@/lib/recipre-filter';

const RecipesPage = async ({ searchParams }: { searchParams: Promise<{ p: string }> }) => {
  const params = await searchParams;
  const page = Number(params.p) || 1;

  const { recipes = [], pagination = { limit: 1, page: 1, total: 0, totalPages: 0 }, error } = await getRecipes(page);

  return (
    <Wrapper>
      <Heading>Рецепты русской кухни</Heading>
      <RecipesFilter />
      {recipes.length === 0 && <div className="flex justify-center items-center text-2xl">Список рецептов пуст</div>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(({ id, ...recipe }) => (
          <a key={id} href={`${ROUTES.recipe(id.toString())}`}>
            <Recipe {...recipe} />
          </a>
        ))}
      </div>
      {pagination.totalPages > 1 && <Pagination {...pagination} />}
    </Wrapper>
  );
};

export default RecipesPage;
