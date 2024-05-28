import Form from "../../../components/form/form";

interface IRegisterForm {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function RegisterForm({
	onSubmit,
}: {
	onSubmit: (values: IRegisterForm) => void;
}) {
	return (
		<Form<IRegisterForm>
			defaultValues={{
				firstName: "",
				lastName: "",
				phone: "",
				email: "",
				password: "",
				confirmPassword: "",
			}}
			onSubmit={onSubmit}
			fields={(builder) =>
				builder
					.addTextInput({
						name: "firstName",
						label: "Имя",
						size: "small",
						required: true,
					})!
					.addTextInput({
						name: "lastName",
						label: "Фамилия",
						size: "small",
					})!
					.addPhoneInput({
						name: "phone",
						size: "small",
						required: true,
					})!
					.addEmailInput({
						name: "email",
						size: "small",
						required: true,
					})!
					.addPasswordInput({
						name: "password",
						size: "small",
						required: true,
					})!
					.addPasswordConfirmInput(
						{
							label: "Повторите пароль",
							name: "confirmPassword",
							size: "small",
							required: true,
						},
						"password"
					)
			}
		/>
	);
}
