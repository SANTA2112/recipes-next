import { getRecipes } from '@/actions/recipe';
import { ErrorMessage } from '@/components/common/error-message';
import { Heading } from '@/components/common/heading';
import { Pagination } from '@/components/common/pagination';
import { Wrapper } from '@/components/common/wrapper';
import { RecipesView } from '@/components/recipes-view';

const RecipesPage = async ({ searchParams }: { searchParams: Promise<{ p: string }> }) => {
  const params = await searchParams;
  const page = Number(params.p) || 1;

  const { recipes = [], pagination = { limit: 1, page: 1, total: 0, totalPages: 0 }, error } = await getRecipes(page);

  return (
    <Wrapper>
      <Heading>Рецепты русской кухни</Heading>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <RecipesView recipes={recipes} />
      {pagination.totalPages > 1 && <Pagination {...pagination} />}
    </Wrapper>
  );
};

export default RecipesPage;
