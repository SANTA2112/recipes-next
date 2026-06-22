'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Loader } from '@/components/common/loader';
import { Wrapper } from '@/components/common/wrapper';
import { Form } from '@/components/ui/authForm/form';
import { FormWrapper } from '@/components/ui/authForm/wrapper';
import { ROUTES } from '@/constants';

const LoginPage = () => {
  const { status } = useSession();
  if (status === 'loading') return <Loader />;
  if (status === 'authenticated') {
    redirect(ROUTES.recipes);
  }

  return (
    <Wrapper className="flex items-center justify-center">
      <FormWrapper type="login">
        <Form type="login" />
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginPage;
