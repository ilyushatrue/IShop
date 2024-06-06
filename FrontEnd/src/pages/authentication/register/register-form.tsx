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
	error,
	onSubmitAsync,
}: {
	error: string;
	onSubmitAsync: (values: IRegisterForm) => Promise<void>;
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
			minHeight={430}
			error={error}
			onSubmitAsync={onSubmitAsync}
			fields={(builder) =>
				builder
					.text({
						name: "firstName",
						label: "Имя",
						size: "small",
						required: true,
					})!
					.text({
						name: "lastName",
						label: "Фамилия",
						size: "small",
					})!
					.phone({
						name: "phone",
						size: "small",
						required: true,
					})!
					.email({
						name: "email",
						size: "small",
						required: true,
					})!
					.password({
						name: "password",
						size: "small",
					})!
					.passwordConfirm({
						label: "Повторите пароль",
						name: "confirmPassword",
						size: "small",
						password: "password",
					})
			}
		/>
	);
}
