import { useEffect, useRef } from "react";
import FormBuilder, { TFormRef } from "../../../components/form/form-builder";

interface IRegisterForm {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function RegisterForm() {
	const form = useRef<TFormRef<IRegisterForm>>(null);

	useEffect(() => {
		form.current?.addTextInput({ name: "firstName", label: "Имя" });
		form.current?.addTextInput({ name: "lastName", label: "Фамилия" });
		form.current?.addPhoneInput({ name: "phone" });
		form.current?.addEmailInput({ name: "email" });
		form.current?.addPasswordInput({ name: "password" });
		form.current?.mountInputs();
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
