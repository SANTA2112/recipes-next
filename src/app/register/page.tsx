'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Wrapper } from '@/components/common/wrapper';
import { Form } from '@/components/ui/authForm/form';
import { FormWrapper } from '@/components/ui/authForm/wrapper';
import { ROUTES } from '@/constants';

const RegisterPage = () => {
  const { status } = useSession();
  if (status === 'authenticated') {
    redirect(ROUTES.recipes);
  }
  return (
    <Wrapper className="flex items-center justify-center">
      <FormWrapper type="register">
        <Form type="register" />
      </FormWrapper>
    </Wrapper>
  );
};

export default RegisterPage;
