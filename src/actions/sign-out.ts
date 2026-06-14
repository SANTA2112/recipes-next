import { signOut } from 'next-auth/react';

export const signOutFunc = async () => {
  try {
    const result = await signOut({ callbackUrl: '/login' });

    return result;
  } catch (error) {
    console.log('Ошибка деавторизации', error);
    throw error;
  }
};
