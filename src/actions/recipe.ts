'use server';

import { getServerSession } from 'next-auth';
import type { ZodError } from 'zod';

import type { Recipe } from '@/constants/form-state.types';
import { prisma } from '@/lib/prisma';
import { recipeSchema } from '@/lib/zod';

const getUserBySession = async () => {
  const session = await getServerSession();
  if (!session?.user?.email) throw new Error('Пользователь не авторизован');

  const user = await prisma.user.findFirst({ where: { email: session?.user?.email } });

  if (!user) throw new Error('Пользователь не найден');
  return user;
};

export const createRecipe = async (credentials: Recipe) => {
  try {
    const parsed = await recipeSchema.parseAsync(credentials);

    const user = await getUserBySession();

    const recipe = await prisma.recipe.create({
      data: {
        ...parsed,
        userId: user.id,
      },
    });

    return { recipe, error: null };
  } catch (e) {
    const message = (e as Error).message;
    const error = `Ошибка при создании рецепта: "${message.includes('message') ? (JSON.parse(message) as [ZodError])[0].message : message}"`;
    console.error(error);
    return { error };
  }
};

export const updateRecipe = async (credentials: Recipe) => {
  try {
    const parsed = await recipeSchema.parseAsync(credentials);

    const user = await getUserBySession();

    const recipe = await prisma.recipe.update({
      data: parsed,
      where: { id: parsed.id, userId: user.id },
    });

    return { recipe, error: null };
  } catch (e) {
    const message = (e as Error).message;
    const error = `Ошибка при обновлении рецепта: "${message.includes('message') ? (JSON.parse(message) as [ZodError])[0].message : message}"`;
    console.error(error);
    return { error };
  }
};

export const deleteRecipe = async (credentials: { id: string }) => {
  try {
    const { id } = credentials;
    if (!id) throw new Error('id рецепта обязателен');

    const user = await getUserBySession();

    const recipe = (await prisma.recipe.findFirst({ where: { id, userId: user.id } })) as Recipe | null;

    if (!recipe) throw new Error('Рецепт не найден или не принадлежит пользователю');

    const deleted = await prisma.recipe.delete({ where: { id } });

    return { id: deleted.id, error: null };
  } catch (e) {
    const error = `Ошибка при удалении рецепта: "${(e as Error).message}"`;
    console.error(error);
    return { error };
  }
};

export const getRecipeByIdWithAuth = async (credentials: { id: string }) => {
  try {
    const { id } = credentials;
    if (!id) throw new Error('id рецепта обязателен');

    const user = await getUserBySession();

    const recipe = (await prisma.recipe.findFirst({ where: { id, userId: user.id } })) as Recipe | null;

    if (!recipe) throw new Error('Не удалось найти рецепт');

    return { recipe, error: null };
  } catch (e) {
    const error = `Ошибка при получении рецепта: "${(e as Error).message}"`;
    console.error(error);
    return { error };
  }
};

export const getRecipeById = async (credentials: { id: string }) => {
  try {
    const { id } = credentials;
    if (!id) throw new Error('id рецепта обязателен');

    const recipe = (await prisma.recipe.findFirst({ where: { id } })) as Recipe | null;

    if (!recipe) throw new Error('Не удалось найти рецепт');

    return { recipe, error: null };
  } catch (e) {
    const error = `Ошибка при получении рецепта: "${(e as Error).message}"`;
    console.error(error);
    return { error };
  }
};

export const getUserRecipes = async () => {
  try {
    const user = await getUserBySession();

    const recipes = await prisma.recipe.findMany({ where: { userId: user.id } });

    return { recipes, error: null };
  } catch (e) {
    const error = `Ошибка при получении рецептов: "${(e as Error).message}"`;
    console.error(error);
    return { error };
  }
};

export const getRecipes = async (page: number) => {
  try {
    const total = await prisma.recipe.count();
    const limit = 12;
    const offset = (page - 1) * limit;

    const recipes = await prisma.recipe.findMany({
      take: limit,
      skip: offset,
      orderBy: { title: 'desc' },
    });

    return {
      recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      error: null,
    };
  } catch (e) {
    const error = `Ошибка при получении рецептов: "${(e as Error).message}"`;
    console.error(error);
    return { error };
  }
};
