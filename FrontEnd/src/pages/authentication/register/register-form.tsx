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
	onSubmitAsync,
	loading,
}: {
	onSubmitAsync: (values: IRegisterForm) => Promise<void>;
	loading: boolean;
}) {
	return (
		<Form<IRegisterForm>
			defaultValues={{
				firstName: "",
				lastName: "",
				phone: "+7",
				email: "",
				password: "",
				confirmPassword: "",
			}}
			minHeight={430}
			loading={loading}
			submitButtonText="Зарегистрироваться"
			onSubmit={onSubmitAsync}
			fields={(builder) =>
				builder
					.text({
						name: "firstName",
						label: "Имя",
						size: "small",
						required: true,
					})
					.text({
						name: "lastName",
						label: "Фамилия",
						size: "small",
					})
					.phone({
						name: "phone",
						size: "small",
						required: false,
					})
					.email({
						name: "email",
						size: "small",
						required: true,
					})
					.password({
						name: "password",
						size: "small",
					})
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
