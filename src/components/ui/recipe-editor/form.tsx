'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { createRecipe, updateRecipe } from '@/actions/recipe';
import SaveIcon from '@/assets/icons/save.svg';
import { AddBlockButton } from '@/components/common/buttons/add-block';
import { Button } from '@/components/common/buttons/button';
import { Checkbox } from '@/components/common/checkbox';
import { ErrorMessage } from '@/components/common/error-message';
import { FillingForm } from '@/components/ui/recipe-editor/filling';
import { IngredietnsForm } from '@/components/ui/recipe-editor/ingredietns';
import { MainForm } from '@/components/ui/recipe-editor/main';
import { Stepper } from '@/components/ui/recipe-editor/stepper';
import { ROUTES } from '@/constants';
import { type Recipe, type RecipeFormState } from '@/constants/form-state';
import { notifyLoading } from '@/utils/toasts';

export type FillingsKeysNames = Extract<keyof RecipeFormState, 'filling' | 'sauses'>;

export const RecipeEditor = (props: Partial<Recipe>) => {
  'use no memo'; // Errors in nested components (with useFormContext) are not received.
  const router = useRouter();
  const [recipeError, setRecipeError] = useState<string | null>(null);
  const methods = useForm<RecipeFormState>({
    values: {
      cookTime: props.cookTime?.toString() ?? '',
      filling:
        props.filling && props.filling.length > 0
          ? props.filling
          : [{ description: '', title: '', ingredients: [{ count: '', title: '', unit: '' }] }],
      fullDesc: props.fullDesc ?? '',
      image: props.image ?? '',
      ingredients:
        props.ingredients && props.ingredients.length > 0 ? props.ingredients : [{ count: '', title: '', unit: '' }],
      instructions: props.instructions && props.instructions.length > 0 ? props.instructions : [{ value: '' }],
      sauses:
        props.sauses && props.sauses.length > 0
          ? props.sauses
          : [{ description: '', title: '', ingredients: [{ count: '', title: '', unit: '' }] }],
      servings: props.servings?.toString() ?? '',
      shortDesc: props.shortDesc ?? '',
      title: props.title ?? '',
      hasFilling: (props?.filling ?? [])?.length > 0,
      hasSauses: (props?.sauses ?? [])?.length > 0,
    },
  });

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const {
    append: appendFilling,
    fields: fillingFields,
    remove: removeFilling,
  } = useFieldArray({ control, name: 'filling' });
  const {
    append: appendSauses,
    fields: sausesFields,
    remove: removeSauses,
  } = useFieldArray({ control, name: 'sauses' });

  const handleAddFilling = (type: FillingsKeysNames) => {
    const newItem = [{ description: '', title: '', ingredients: [{ count: '', title: '', unit: '' }] }];

    if (type === 'filling') appendFilling(newItem);
    if (type === 'sauses') appendSauses(newItem);
  };

  const handleRemoveFilling = (type: FillingsKeysNames, index: number) => {
    if (type === 'filling') removeFilling(index);
    if (type === 'sauses') removeSauses(index);
  };

  const [hasFilling, hasSauses] = watch(['hasFilling', 'hasSauses']);
  const hasFieldsErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<RecipeFormState> = async (data) => {
    setRecipeError(null);

    const toastId = notifyLoading();

    try {
      const {
        cookTime,
        filling,
        fullDesc,
        hasFilling,
        hasSauses,
        image,
        ingredients,
        instructions,
        sauses,
        servings,
        shortDesc,
        title,
      } = data;
      const converted = {
        cookTime: Number(cookTime),
        filling: hasFilling ? filling : [],
        fullDesc,
        ingredients: ingredients,
        instructions: instructions,
        sauses: hasSauses ? sauses : [],
        servings: Number(servings),
        shortDesc,
        title,
        image,
      };
      if (props.id) {
        const response = await updateRecipe({ ...converted, id: props.id });
        if (!response.error) {
          toast.update(toastId, {
            render: 'Рецепт успешно сохранен!',
            autoClose: 3000,
            type: 'success',
          });
          router.push(ROUTES.myrecipes);
        } else {
          throw new Error(response.error);
        }
      } else {
        const response = await createRecipe(converted);
        if (!response.error) {
          toast.update(toastId, {
            render: 'Рецепт успешно создан!',
            autoClose: 3000,
            type: 'success',
          });
          router.push(ROUTES.myrecipes);
        } else {
          throw new Error(response.error);
        }
      }
    } catch (e) {
      const error = (e as Error).message;
      setRecipeError(error);
      toast.update(toastId, {
        render: error,
        autoClose: 3000,
        type: 'error',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <MainForm />
        <IngredietnsForm heading="Ингредиенты" />
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <Controller
              control={control}
              name="hasFilling"
              render={({ field }) => (
                <Checkbox
                  label="Добавить начинки"
                  disabled={isSubmitting}
                  checked={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
            {hasFilling && (
              <AddBlockButton onClick={() => handleAddFilling('filling')}>Добавить начинку</AddBlockButton>
            )}
          </div>
          {hasFilling &&
            fillingFields.map((fill, index) => (
              <FillingForm
                key={fill.id}
                deleteFilling={() => handleRemoveFilling('filling', index)}
                showDeleteButton={fillingFields.length > 1}
                fieldName={`filling.${index}`}
                index={index}
                originalKey="filling"
              />
            ))}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <Controller
              control={control}
              name="hasSauses"
              render={({ field }) => (
                <Checkbox
                  disabled={isSubmitting}
                  label="Добавить соуса"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {hasSauses && <AddBlockButton onClick={() => handleAddFilling('sauses')}>Добавить соус</AddBlockButton>}
          </div>
          {hasSauses &&
            sausesFields.map((fill, index) => (
              <FillingForm
                key={fill.id}
                deleteFilling={() => handleRemoveFilling('sauses', index)}
                showDeleteButton={sausesFields.length > 1}
                fieldName={`sauses.${index}`}
                index={index}
                originalKey="sauses"
                {...fill}
              />
            ))}
        </div>
        <Stepper />
        {recipeError && <ErrorMessage>{recipeError}</ErrorMessage>}
        {hasFieldsErrors && <ErrorMessage>Некоторые поля формы заполнены некорректно</ErrorMessage>}
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting || hasFieldsErrors}>
            <SaveIcon className="w-5 h-5" />
            <span>Сохранить рецепт</span>
          </Button>
          <a
            href={ROUTES.myrecipes}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all font-medium"
          >
            Отмена
          </a>
        </div>
      </form>
    </FormProvider>
  );
};
