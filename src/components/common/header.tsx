'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { signOutFunc } from '@/actions/sign-out';
import ClientIcon from '@/assets/icons/client.svg';
import { Button } from '@/components/common/buttons/button';
import StyledLink from '@/components/common/styledLink';
import { menu, ROUTES } from '@/constants';

export const Header = () => {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOutFunc();
  };
  const isAuth = status === 'authenticated';
  const isLoading = status === 'loading';
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm min-h-20 flex">
      <div className="container mx-auto px-4 py-4 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between">
        <StyledLink href={ROUTES.recipes} className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Image src="/logo.svg" width={24} height={24} alt="Русская кухня" priority />
          </div>
          <span className="font-bold text-xl bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Русская кухня
          </span>
        </StyledLink>
        {isLoading ? (
          <p className="text-gray-700 font-medium">Загрузка меню...</p>
        ) : (
          <nav className="flex items-center gap-4">
            {menu
              .filter((item) => (item.link === ROUTES.myrecipes ? isAuth : true))
              .map(({ link, title }) => (
                <StyledLink
                  key={link}
                  href={link}
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  {title}
                </StyledLink>
              ))}
          </nav>
        )}

        {isLoading ? (
          <p className="text-gray-700 font-medium">Загрузка сессии...</p>
        ) : (
          <div className="flex items-center gap-4">
            {isAuth && <p className="text-orange-600 font-medium">{session.user?.email}</p>}
            {isAuth ? (
              <button
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium cursor-pointer"
                onClick={handleSignOut}
              >
                Выйти
              </button>
            ) : (
              <>
                <StyledLink
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                  href={ROUTES.login}
                >
                  Вход
                </StyledLink>
                <StyledLink href={ROUTES.register}>
                  <Button>
                    <div className="flex items-center justify-center gap-2">
                      <ClientIcon className="w-4 h-4 text-white" />
                      <span>Регистрация</span>
                    </div>
                  </Button>
                </StyledLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
