import Link from 'next/link';

import { Button } from '@/components/ui/buttons/button';
import { AchievementComponent } from '@/components/ui/cards/achievement';
import { Info } from '@/components/ui/cards/info';
import { infoCards, achievements, ROUTES } from '@/constants';

const AboutPage = () => {
  const [info1, info2] = infoCards;
  return (
    <div>
      <div className="bg-linear-to-r from-orange-400 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4 font-bold">О нас</h1>
          <p className="text-xl text-white/90">Сохраняем традиции русской кухни для будущих поколений</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <Info title={info1.title}>{info1.descriptions}</Info>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {achievements.map((item) => (
            <AchievementComponent achievement={item} key={item.title} />
          ))}
        </div>
        <Info title={info2.title}>{info2.descriptions}</Info>
        <div className="mt-8 bg-linear-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center border-2 border-orange-100">
          <h2 className="text-2xl mb-4 font-bold">Присоединяйтесь к нам!</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Зарегистрируйтесь, чтобы создавать свои рецепты, сохранять избранное и общаться с другими любителями русской
            кухни.
          </p>
          <Link href={ROUTES.register} className="flex justify-center">
            <Button notFullWidth>Зарегистрироваться</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
