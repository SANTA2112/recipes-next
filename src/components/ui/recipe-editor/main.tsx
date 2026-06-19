'use client';

import { useFormStatus } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/common/input';
import { Textarea } from '@/components/common/textarea';
import type { RecipeFormState } from '@/constants/form-state';

type MainFormState = Omit<
  RecipeFormState,
  'filling' | 'ingredients' | 'instructions' | 'sauses' | 'hasFilling' | 'hasSauses'
>;

export const MainForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<MainFormState>();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 space-y-6">
      <Input
        disabled={isSubmitting}
        placeholder="Например: Борщ классический"
        labelText="Название блюда"
        isError={Boolean(errors.title?.message)}
        message={errors.title?.message || ''}
        {...register('title', { required: { value: true, message: 'Это поле обязательное' } })}
      />
      <Input
        disabled={isSubmitting}
        placeholder="https://example.com/image.jpg"
        labelText="Изображение (URL)"
        isError={Boolean(errors.image?.message)}
        message={errors.image?.message || ''}
        {...register('image', {
          pattern: {
            value:
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            message: 'Некорректная ссылка ',
          },
        })}
      />
      <Input
        disabled={isSubmitting}
        placeholder="Краткое описание для карточки рецепта"
        labelText="Краткое описание"
        isError={Boolean(errors.shortDesc?.message)}
        message={errors.shortDesc?.message || ''}
        {...register('shortDesc', { required: { value: true, message: 'Это поле обязательное' } })}
      />
      <Textarea
        disabled={isSubmitting}
        placeholder="Подробное описание блюда, история, особенности..."
        labelText="Полное описание"
        {...register('fullDesc')}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          disabled={isSubmitting}
          placeholder="Например: 10"
          type="number"
          labelText="Количество порций"
          isError={Boolean(errors.servings?.message)}
          message={errors.servings?.message || ''}
          {...register('servings', {
            required: { value: true, message: 'Это поле обязательное' },
            min: { value: 1, message: 'Должна быть хотя бы одна порция' },
            max: { value: 10, message: 'Должно быть не более 10 порций' },
            valueAsNumber: true,
          })}
        />
        <Input
          disabled={isSubmitting}
          placeholder="Например: 90"
          type="number"
          labelText="Время приготовления (в минутах)"
          isError={Boolean(errors.cookTime?.message)}
          message={errors.cookTime?.message || ''}
          {...register('cookTime', {
            required: { value: true, message: 'Это поле обязательное' },
            min: { value: 1, message: 'Время не может быть отрицательным' },
            max: { value: 720, message: 'Готовка занимает слишком много времени' },
            valueAsNumber: true,
          })}
        />
      </div>
    </div>
  );
};
