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
		});
		form.current?.addTextInput({
			name: "lastName",
			label: "Фамилия",
			size: "small",
		});
		form.current?.addPhoneInput({ name: "phone", size: "small" });
		form.current?.addEmailInput({ name: "email", size: "small" });
		form.current?.addPasswordInput({ name: "password", size: "small" });
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
