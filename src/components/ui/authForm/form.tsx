'use client';
import { redirect } from 'next/navigation';
import { useState, type ComponentPropsWithoutRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { registerUser } from '@/actions/register';
import { singInWithCredentials } from '@/actions/sign-in';
import { Button } from '@/components/common/buttons/button';
import { ErrorMessage } from '@/components/common/error-message';
import { Input } from '@/components/common/input';
import { ROUTES, type FormType } from '@/constants';
import type { AuthFormState } from '@/constants/form-state';
import { notifyLoading } from '@/utils/toasts';

interface Props extends ComponentPropsWithoutRef<'form'> {
  type: FormType;
}

export const Form = (props: Props) => {
  const { type, ...rest } = props;
  const buttonText = type === 'login' ? 'Войти' : 'Зарегистрироваться';
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthFormState>();

  const { pending } = useFormStatus();

  const onSubmit: SubmitHandler<AuthFormState> = async (data) => {
    setAuthError(null);

    const toastId = notifyLoading();

    const { confirm_password, email, password } = data;
    if (type === 'register') {
      if (confirm_password !== data.password) {
        setError('confirm_password', { type: 'value', message: 'Пароли не совпадают' });
        return toast.update(toastId, {
          render: 'Пароли не совпадают',
          autoClose: 3000,
          type: 'error',
        });
      }
      const result = await registerUser({ email, password });
      if (result.error) {
        setAuthError(result.error);
        return toast.update(toastId, {
          render: result.error,
          autoClose: 3000,
          type: 'error',
        });
      }
      toast.update(toastId, {
        render: 'Регистрация прошла успешно!',
        autoClose: 3000,
        type: 'success',
      });
      redirect(ROUTES.login);
    }
    if (type === 'login') {
      const result = await singInWithCredentials(email, password);
      if (result?.status === 401) {
        const error = 'Не верный логин или пароль';
        setAuthError(error);
        return toast.update(toastId, {
          render: error,
          autoClose: 3000,
          type: 'error',
        });
      }
      toast.update(toastId, {
        render: 'Успешный вход!',
        autoClose: 3000,
        type: 'success',
      });
      redirect(ROUTES.recipes);
    }
  };

  return (
    <form {...rest} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        disabled={pending}
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
        disabled={pending}
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
          disabled={pending}
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
      <Button disabled={pending}>{buttonText}</Button>
      {authError && <ErrorMessage>{authError}</ErrorMessage>}
    </form>
  );
};
