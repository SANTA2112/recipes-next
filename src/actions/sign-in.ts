import { signIn } from 'next-auth/react';

export const singInWithCredentials = async (email: string, password: string) => {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return result;
  } catch (error) {
    console.error('Ошибка авторизации', error);
    throw error;
  }
};
