import { useEffect, useRef } from "react";
import   FormBuilder, { TFormRef } from "../components/form/form-builder";

interface IRegisterForm  {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page2() {
  const form = useRef<TFormRef<IRegisterForm>>(null);

  useEffect(() => {
    form.current?.addEmailInput('email');
    form.current?.addPasswordInput('password');
    form.current?.addTextInput('firstName');
	form.current?.useFields()
  }, []);

  return (
	<>
    <FormBuilder<IRegisterForm>
      defaultValues={{
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      ref={form}
    />
	</>
  );
}
