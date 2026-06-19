export interface Ingredient {
  title: string;
  count: string;
  unit: string;
}

export interface Instructions {
  value: string;
}

export interface Filling {
  title: string;
  description: string;
  ingredients: Ingredient[];
}

export interface Recipe {
  id?: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string | null;
  servings: number | string;
  cookTime: number | string;
  ingredients: Ingredient[];
  sauses: Filling[];
  filling: Filling[];
  instructions: Instructions[];
}

export interface RecipeFormState extends Recipe {
  hasFilling: boolean;
  hasSauses: boolean;
}

export interface AuthFormState {
  email: string;
  password: string;
  confirm_password: string;
}
