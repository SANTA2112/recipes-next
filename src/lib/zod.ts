import { array, email, number, object, string } from 'zod';

export const signInSchema = object({
  email: email({ pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim, error: 'Некорректный email' })
    .min(1, 'Email is required')
    .max(512, 'Email must be at most 512 characters'),
  password: string({
    error: 'Password is required',
  })
    .min(3, 'Password must be at least 3 characters')
    .max(32, 'Password must be at most 32 characters'),
});

const ingredientSchema = object({
  title: string({
    error: 'Ingredient title is required',
  })
    .min(1, 'Ingredient title is required')
    .max(64, 'Ingredient title must be at most 64 characters'),
  count: number({
    error: 'Ingredient count is required',
  })
    .min(1, 'Ingredient count is required')
    .max(10000, 'Ingredient count must be at most 10000'),
  unit: string({
    error: 'Ingredient unit is required',
  })
    .min(1, 'Ingredient unit is required')
    .max(64, 'Ingredient unit must be at most 64 characters'),
});

const instructionsSchema = object({
  value: string({
    error: 'Instruction value is required',
  })
    .min(1, 'Instruction value is required')
    .max(512, 'Instruction value must be at most 512 characters'),
});

const fillingSchema = object({
  title: string({
    error: 'Filling title is required',
  })
    .min(1, 'Filling title is required')
    .max(64, 'Filling title must be at most 64 characters'),
  description: string({
    error: 'Filling description is required',
  })
    .min(1, 'Filling description is required')
    .max(512, 'Filling description must be at most 512 characters'),
  ingredients: array(ingredientSchema).min(1, 'At least one ingredient is required'),
});

export const recipeSchema = object({
  id: string().optional(),
  title: string({
    error: 'Recipe title is required',
  })
    .min(1, 'Recipe title is required')
    .max(64, 'Recipe title must be at most 64 characters'),
  shortDesc: string({
    error: 'Short description is required',
  })
    .min(1, 'Short description is required')
    .max(128, 'Short description must be at most 128 characters'),
  fullDesc: string({
    error: 'Full description is required',
  }).max(512, 'Full description must be at most 512 characters'),
  image: string().optional(),
  servings: number({
    error: 'Servings is required',
  })
    .min(1, 'Servings is required')
    .max(10, 'Servings must be at most 10'),
  cookTime: number({
    error: 'Cook time is required',
  })
    .min(1, 'Cook time is required')
    .max(720, 'Cook time must be at most 720 minutes'),
  ingredients: array(ingredientSchema).min(1, 'At least one ingredient is required'),
  sauses: array(fillingSchema).optional().default([]),
  filling: array(fillingSchema).optional().default([]),
  instructions: array(instructionsSchema).min(1, 'At least one instruction is required'),
});
