import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FormType } from '@/constants';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'form'> {
  type: FormType;
}

export const Form = (props: Props) => {
  const { type, ...rest } = props;
  const buttonText = type === 'login' ? 'Войти' : 'Зарегистрироваться';

  return (
    <form {...rest} className="space-y-6">
      <Input labelText="Логин" placeholder="Введите логин" name="login" />
      <Input labelText="Пароль" placeholder="Введите пароль" name="password" type="password" />
      {type === 'register' && (
        <Input labelText="Повторите пароль" placeholder="Повторите пароль" name="repeated_password" type="password" />
      )}
      <Button>{buttonText}</Button>
    </form>
  );
};
