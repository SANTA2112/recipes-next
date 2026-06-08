'use client';
import Link from 'next/link';
import { Controller, FormProvider, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';

import SaveIcon from '@/assets/icons/save.svg';
import { AddBlockButton } from '@/components/common/buttons/add-block';
import { Button } from '@/components/common/buttons/button';
import { Checkbox } from '@/components/common/checkbox';
import { FillingForm } from '@/components/ui/recipe-editor/filling';
import { IngredietnsForm } from '@/components/ui/recipe-editor/ingredietns';
import { MainForm } from '@/components/ui/recipe-editor/main';
import { Stepper } from '@/components/ui/recipe-editor/stepper';
import { ROUTES } from '@/constants';
import { type Recipe, type RecipeFormState } from '@/constants/form-state';

export type FillingsKeysNames = Extract<keyof RecipeFormState, 'filling' | 'sauses'>;

export const RecipeEditor = (props: Partial<Recipe>) => {
  'use no memo'; // Errors in nested components (with useFormContext) are not received.
  const methods = useForm<RecipeFormState>({
    values: {
      cookTime: props.cookTime?.toString() ?? '',
      filling: props.filling ?? [{ description: '', title: '', ingredients: [{ count: '', title: '', unit: '' }] }],
      fullDesc: props.fullDesc ?? '',
      image: props.image ?? '',
      ingredients: props.ingredients ?? [{ count: '', title: '', unit: '' }],
      instructions: props.instructions ?? [{ value: '' }],
      sauses: props.sauses ?? [{ description: '', title: '', ingredients: [{ count: '', title: '', unit: '' }] }],
      servings: props.servings?.toString() ?? '',
      shortDesc: props.shortDesc ?? '',
      title: props.title ?? '',
      hasFilling: (props?.filling ?? [])?.length > 0,
      hasSauses: (props?.sauses ?? [])?.length > 0,
    },
  });

  const { watch, handleSubmit, control } = methods;

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

  const onSubmit: SubmitHandler<RecipeFormState> = (data) => {
    console.log(data);
  };
  const [hasFilling, hasSauses] = watch(['hasFilling', 'hasSauses']);

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
                <Checkbox label="Добавить соуса" checked={field.value} onChange={field.onChange} />
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
        <div className="flex gap-4">
          <Button type="submit">
            <SaveIcon className="w-5 h-5" />
            <span>Сохранить рецепт</span>
          </Button>
          <Link
            href={ROUTES.myrecipes}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all font-medium"
          >
            Отмена
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};
