'use server';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { signInSchema } from '@/lib/zod';
import { saltAndHashPassword } from '@/utils/password';

export type UserPayload = Pick<Prisma.UserCreateInput, 'email' | 'password'>;

export const registerUser = async (credentials: UserPayload) => {
  try {
    const { email, password } = await signInSchema.parseAsync(credentials);
    const exsistingUser = await prisma.user.findUnique({ where: { email } });

    if (exsistingUser) {
      return { error: 'Пользователь с таким email уже существует' };
    }

    const pwHash = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: pwHash,
      },
    });

    return { id: user.id, email: user.email, error: null };
  } catch (e) {
    const error = `Ошибка при регистрации ${(e as Error).message}`;
    console.error(error);
    return { error };
  }
};
