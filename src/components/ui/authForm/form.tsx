'use client';
import type { ComponentPropsWithoutRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/common/buttons/button';
import { Input } from '@/components/common/input';
import type { FormType } from '@/constants';
import type { AuthFormState } from '@/constants/form-state';

interface Props extends ComponentPropsWithoutRef<'form'> {
  type: FormType;
}

export const Form = (props: Props) => {
  const { type, ...rest } = props;
  const buttonText = type === 'login' ? 'Войти' : 'Зарегистрироваться';

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthFormState>();

  const onSubmit: SubmitHandler<AuthFormState> = (data) => {
    console.log(data);
    if (type === 'register') {
      if (data.confirm_password !== data.password) {
        setError('confirm_password', { type: 'value', message: 'Пароли не совпадают' });
      }
    }
  };

  return (
    <form {...rest} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        labelText="Логин"
        placeholder="Введите логин"
        required
        isError={Boolean(errors.email?.message)}
        message={errors.email?.message || ''}
        {...register('email', {
          pattern: {
            value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
            message: 'Некорректный email',
          },
        })}
      />
      <Input
        labelText="Пароль"
        placeholder="Введите пароль"
        type="password"
        required
        isError={Boolean(errors.password?.message)}
        message={errors.password?.message || ''}
        {...register('password', {
          minLength: { value: 3, message: 'Минимум 3 символа' },
        })}
      />
      {type === 'register' && (
        <Input
          labelText="Повторите пароль"
          placeholder="Повторите пароль"
          type="password"
          required
          isError={Boolean(errors.confirm_password?.message)}
          message={errors.confirm_password?.message || ''}
          {...register('confirm_password', {
            minLength: { value: 3, message: 'Минимум 3 символа' },
          })}
        />
      )}
      <Button>{buttonText}</Button>
    </form>
  );
};
