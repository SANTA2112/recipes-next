import Link from 'next/link';
import { notFound } from 'next/navigation';

import ArrowIcon from '@/assets/icons/arrow.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import PeopleIcon from '@/assets/icons/people.svg';
import PrintIcon from '@/assets/icons/print.svg';
import { CookSteps } from '@/components/ui/cook-steps';
import { ProxyImage } from '@/components/ui/proxy-image';
import { Wrapper } from '@/components/ui/wrapper';
import { ROUTES } from '@/constants';
import { RecipeCalc } from '@/lib/recipe-calc';
import { formatServings, formatTime } from '@/utils/format';

async function getRecipe(slug: string) {
  return { slug };
}

const RecipePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const recipe = await getRecipe(slug);

  if (!recipe) return notFound();

  const recipes = {
    title: 'Борщ классический',
    shortDesc: 'Традиционный украинский борщ с говядиной и сметаной',
    cookTime: 90,
    servings: 6,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
    ingredients: [
      {
        title: 'Говядина на кости',
        count: 500,
        unit: 'г',
      },
      {
        title: 'Свекла',
        count: 2,
        unit: 'шт',
      },
      {
        title: 'Капуста белокочанная',
        count: 300,
        unit: 'г',
      },
      {
        title: 'Картофель',
        count: 3,
        unit: 'шт',
      },
      {
        title: 'Морковь',
        count: 1,
        unit: 'шт',
      },
      {
        title: 'Лук репчатый',
        count: 1,
        unit: 'шт',
      },
      {
        title: 'Томатная паста',
        count: 2,
        unit: 'ст. л.',
      },
      {
        title: 'Уксус 9%',
        count: 1,
        unit: 'ст. л.',
      },
      {
        title: 'Чеснок',
        count: 3,
        unit: 'зубчика',
      },
      {
        title: 'Сметана',
        count: 2,
        unit: 'ст. л.',
      },
    ],
    instructions: [
      'Мясо залить холодной водой, довести до кипения, снять пену. Варить бульон 1.5 часа на медленном огне.',
      'Свеклу натереть на крупной терке, добавить уксус и томатную пасту. Тушить 15 минут.',
      'Картофель нарезать кубиками, капусту нашинковать.',
      'Морковь и лук обжарить на растительном масле до золотистого цвета.',
      'В кипящий бульон добавить картофель, через 10 минут - капусту.',
      'Добавить тушеную свеклу и зажарку из моркови и лука.',
      'Варить 15 минут, посолить, поперчить, добавить давленый чеснок.',
      'Дать настояться под крышкой 20 минут. Подавать со сметаной и черным хлебом.',
    ],
  };

  const { cookTime, image, servings, shortDesc, title, ingredients, instructions } = recipes;

  return (
    <div>
      <div className="relative h-96 overflow-hidden">
        <ProxyImage src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8 flex flex-col items-start">
          <Link
            href={ROUTES.recipes}
            className="mb-4 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all"
          >
            <ArrowIcon className="w-5 h-5" />
            <span>Назад к списку</span>
          </Link>
          <h1 className="text-4xl text-white mb-4">{title}</h1>
          <p className="text-white/90 text-lg mb-4">{shortDesc}</p>
          <div className="flex items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span className="shrink-0">{formatTime(cookTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <PeopleIcon className="w-5 h-5" />
              <span className="shrink-0">{formatServings(servings)}</span>
            </div>
          </div>
        </div>
      </div>
      <Wrapper>
        <div className="flex justify-end mb-6">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full hover:shadow-md transition-all hover:border-orange-300 cursor-pointer">
            <PrintIcon className="w-4 h-4 text-orange-600" />
            <span className="font-medium">Печать рецепта</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecipeCalc ingredients={ingredients} servings={servings} />
          <CookSteps instructions={instructions} />
        </div>
      </Wrapper>
    </div>
  );
};

export default RecipePage;
