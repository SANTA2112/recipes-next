import { Wrapper } from '@/components/common/wrapper';
import { Form } from '@/components/ui/authForm/form';
import { FormWrapper } from '@/components/ui/authForm/wrapper';

const RegisterPage = () => {
  return (
    <Wrapper className="flex items-center justify-center">
      <FormWrapper type="register">
        <Form type="register" />
      </FormWrapper>
    </Wrapper>
  );
};

export default RegisterPage;
