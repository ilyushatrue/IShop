import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../../../components/form/form";
import { Box } from "@mui/material";
import Button from "../../../components/buttons/button";

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
	loading,
}: {
	onSubmit: (values: IRegisterForm) => void;
	loading: boolean;
}) {
	const defaultValues = {
		firstName: "",
		lastName: "",
		phone: "+7",
		email: "",
		password: "",
		confirmPassword: "",
	};
	const { handleSubmit, control, watch, reset } = useForm<IRegisterForm>({
		mode: "onChange",
		reValidateMode: "onBlur",
		defaultValues,
	});

	const handleSubmitButtonClick: SubmitHandler<IRegisterForm> = (values) => {
		onSubmit(values);
	};

	return (
		<Form<IRegisterForm>
			control={control}
			watch={watch}
			loading={loading}
			style={{ marginBottom: 24 }}
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
		>
			<Box display={"flex"} justifyContent={"center"} marginTop={"16px"}>
				<Button
					onClick={handleSubmit(handleSubmitButtonClick)}
					size="large"
					sx={{ minWidth: 150, height: 50 }}
					disabled={loading}
				>
					Зарегистрироваться
				</Button>
			</Box>
		</Form>
	);
}
