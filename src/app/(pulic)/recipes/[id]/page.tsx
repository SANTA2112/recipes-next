import { notFound } from 'next/navigation';

import { getRecipeById } from '@/actions/recipe';
import ClockIcon from '@/assets/icons/clock.svg';
import PeopleIcon from '@/assets/icons/people.svg';
import { BackButton } from '@/components/common/buttons/back';
import { PrintButton } from '@/components/common/buttons/print';
import { CookSteps } from '@/components/common/cook-steps';
import { ProxyImage } from '@/components/common/proxy-image';
import { Wrapper } from '@/components/common/wrapper';
import { RecipeCalc } from '@/components/recipe-calc';
import { Filling } from '@/components/ui/filling';
import { formatServings, formatTime } from '@/utils/format';
import { notifyError } from '@/utils/toasts';

const RecipePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { error, recipe } = await getRecipeById({ id });

  if (error) {
    notifyError(error);
  }

  if (!recipe) notFound();

  const { cookTime, image, servings, shortDesc, title, ingredients, instructions, filling, fullDesc, sauses } = recipe;

  return (
    <div>
      <div className="relative h-96 overflow-hidden no-print">
        <ProxyImage src={image ?? ''} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8 flex flex-col items-start">
          <BackButton />
          <h1 className="text-4xl text-white mb-4">{title}</h1>
          <p className="text-white/90 text-lg mb-4 line-clamp-2">{shortDesc}</p>
          <p className="text-white/90 text-lg mb-4 line-clamp-2">{fullDesc}</p>
          <div className="flex items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span className="shrink-0">{formatTime(Number(cookTime))}</span>
            </div>
            <div className="flex items-center gap-2">
              <PeopleIcon className="w-5 h-5" />
              <span className="shrink-0">{formatServings(Number(servings))}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-8 flex-col items-start hidden fix-recipe-container">
        <h1 className="text-4xl text-white mb-4">{title}</h1>
        <p className="text-white/90 text-lg mb-4">{shortDesc}</p>
        <p className="text-white/90 text-lg mb-4">{fullDesc}</p>
        <div className="flex items-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5" />
            <span className="shrink-0">{formatTime(Number(cookTime))}</span>
          </div>
          <div className="flex items-center gap-2">
            <PeopleIcon className="w-5 h-5" />
            <span className="shrink-0">{formatServings(Number(servings))}</span>
          </div>
        </div>
      </div>
      <Wrapper>
        <div className="flex justify-end mb-6">
          <PrintButton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecipeCalc ingredients={ingredients} servings={servings} />
          <CookSteps instructions={instructions} />
        </div>
        <div className="flex flex-col items-end md:flex-row gap-x-4 justify-end">
          {filling.length > 0 && <Filling heading="Начинки:" filling={filling} />}
          {sauses.length > 0 && <Filling heading="Соуса:" filling={sauses} />}
        </div>
      </Wrapper>
    </div>
  );
};

export default RecipePage;
