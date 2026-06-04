'use server';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export type UserPayload = Pick<Prisma.UserCreateInput, 'email' | 'password'>;

export const registerUser = async (payload: UserPayload) => {
  try {
    const user = await prisma.user.create({
      data: payload,
    });
    return user;
  } catch (e) {
    const error = `Ошибка при регистрации ${(e as Error).message}`;
    console.error(error);
    return { error };
  }
};
