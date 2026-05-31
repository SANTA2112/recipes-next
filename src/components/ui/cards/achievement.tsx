import type { Achievement } from '@/constants';

interface Props {
  achievement: Achievement;
}

export const AchievementComponent = (props: Props) => {
  const {
    achievement: { description, icon: Icon, title },
  } = props;

  return (
    <div
      key={title}
      className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="w-14 h-14 bg-linear-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-2">
        <Icon className="w-7 h-7 text-orange-600" />
      </div>
      <h3 className="text-xl mb-2 font-semibold">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
