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
		form.current?.addTextInput({
			name: "firstName",
			label: "Имя",
			size: "small",
			required: true,
		});
		form.current?.addTextInput({
			name: "lastName",
			label: "Фамилия",
			size: "small",
		});
		form.current?.addPhoneInput({
			name: "phone",
			size: "small",
			required: true,
		});
		form.current?.addEmailInput({
			name: "email",
			size: "small",
			required: true,
		});
		form.current?.addPasswordInput({
			name: "password",
			size: "small",
			required: true,
		});
		form.current?.addPasswordConfirmInput(
			{ name: "confirmPassword", size: "small", required: true },
			"password"
		);
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
