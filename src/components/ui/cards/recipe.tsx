import { formatPortion, formatTime } from '@/utils/format';
import ClockIcon from '@/assets/icons/clock.svg';
import PeopleIcon from '@/assets/icons/people.svg';

interface Props {
  title: string;
  shortDesc: string;
  cookTime: number;
  portions: number;
  image: string;
}

export const Recipe = (props: Props) => {
  const { cookTime, image, portions, shortDesc, title } = props;
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100">
      <div className="aspect-video overflow-hidden">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={`/api/image-proxy?url=${encodeURIComponent(image)}`}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl mb-2 font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shortDesc}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-orange-500" />
            <span className="shrink-0">{formatTime(cookTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PeopleIcon className="w-4 h-4 text-orange-500" />
            <span className="shrink-0">{formatPortion(portions)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
