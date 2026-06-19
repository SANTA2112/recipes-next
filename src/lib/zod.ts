import { array, email, number, object, string } from 'zod';

export const signInSchema = object({
  email: email({ pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim, error: 'Некорректный email' }).min(
    1,
    'Email is required',
  ),
  password: string({
    error: 'Password is required',
  })
    .min(3, 'Password must be at least 3 characters')
    .max(32, 'Password must be at most 32 characters'),
});

const ingredientSchema = object({
  title: string({
    error: 'Ingredient title is required',
  }).min(1, 'Ingredient title is required'),
  count: number({
    error: 'Ingredient count is required',
  }).min(1, 'Ingredient count is required'),
  unit: string({
    error: 'Ingredient unit is required',
  }).min(1, 'Ingredient unit is required'),
});

const instructionsSchema = object({
  value: string({
    error: 'Instruction value is required',
  }).min(1, 'Instruction value is required'),
});

const fillingSchema = object({
  title: string({
    error: 'Filling title is required',
  }).min(1, 'Filling title is required'),
  description: string({
    error: 'Filling description is required',
  }).min(1, 'Filling description is required'),
  ingredients: array(ingredientSchema).min(1, 'At least one ingredient is required'),
});

export const recipeSchema = object({
  id: string().optional(),
  title: string({
    error: 'Recipe title is required',
  }).min(1, 'Recipe title is required'),
  shortDesc: string({
    error: 'Short description is required',
  }).min(1, 'Short description is required'),
  fullDesc: string({
    error: 'Full description is required',
  }),
  image: string().optional(),
  servings: number({
    error: 'Servings is required',
  }).min(1, 'Servings is required'),
  cookTime: number({
    error: 'Cook time is required',
  }).min(1, 'Cook time is required'),
  ingredients: array(ingredientSchema).min(1, 'At least one ingredient is required'),
  sauses: array(fillingSchema).optional().default([]),
  filling: array(fillingSchema).optional().default([]),
  instructions: array(instructionsSchema).min(1, 'At least one instruction is required'),
});
