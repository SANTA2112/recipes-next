import { Form } from '@/components/ui/authForm/form';
import { FormWrapper } from '@/components/ui/authForm/wrapper';
import { Wrapper } from '@/components/ui/wrapper';

const RegisterPage = () => {
  return (
    <Wrapper>
      <FormWrapper type="register">
        <Form type="register" />
      </FormWrapper>
    </Wrapper>
  );
};

export default RegisterPage;
