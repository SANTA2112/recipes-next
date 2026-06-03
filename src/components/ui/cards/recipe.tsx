import Link from 'next/link';

import ClockIcon from '@/assets/icons/clock.svg';
import PeopleIcon from '@/assets/icons/people.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { Button } from '@/components/ui/buttons/button';
import { ProxyImage } from '@/components/ui/proxy-image';
import { ROUTES } from '@/constants';
import { formatServings, formatTime } from '@/utils/format';

interface Props {
  title: string;
  shortDesc: string;
  cookTime: number;
  servings: number;
  image: string;
  slug?: string;
}

export const Recipe = (props: Props) => {
  const { cookTime, image, servings, shortDesc, title, slug } = props;
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100">
      <div className="aspect-video overflow-hidden">
        <ProxyImage
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={image}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl mb-2 font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{shortDesc}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-orange-500" />
            <span className="shrink-0">{formatTime(cookTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PeopleIcon className="w-4 h-4 text-orange-500" />
            <span className="shrink-0">{formatServings(servings)}</span>
          </div>
        </div>
        {slug && (
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-red-50 transition-all cursor-pointer">
              <TrashIcon className="w-4 h-4" style={{ stroke: 'var(--color-red-500)' }} />
            </button>
            <Link className="block w-full" href={ROUTES.editRecipe(slug)}>
              <Button>Редактировать</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
