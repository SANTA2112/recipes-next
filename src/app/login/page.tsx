import { Form } from '@/components/ui/authForm/form';
import { FormWrapper } from '@/components/ui/authForm/wrapper';
import { Wrapper } from '@/components/ui/wrapper';

const LoginPage = () => {
  return (
    <Wrapper>
      <FormWrapper type="login">
        <Form type="login" />
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginPage;
