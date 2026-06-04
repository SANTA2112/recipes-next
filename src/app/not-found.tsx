import Image from 'next/image';
import Link from 'next/link';

import ArrowIcon from '@/assets/icons/arrow.svg';
import { Button } from '@/components/ui/buttons/button';
import { Heading } from '@/components/ui/heading';
import { Wrapper } from '@/components/ui/wrapper';
import { ROUTES } from '@/constants';

const notFoundPage = () => {
  return (
    <Wrapper className="h-100 translate-y-1/2 flex justify-center items-center flex-col">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center shadow-lg">
          <Image src="/logo.svg" alt="Русская кухня" width={48} height={48} />
        </div>
      </div>
      <Heading>Страница не найдена</Heading>
      <Link href={ROUTES.recipes}>
        <Button>
          <ArrowIcon className="w-5 h-5" />
          <span>Вернуться на главную</span>
        </Button>
      </Link>
    </Wrapper>
  );
};

export default notFoundPage;
