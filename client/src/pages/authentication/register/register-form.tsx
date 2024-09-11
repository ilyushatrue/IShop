import { SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import Button from "../../../components/buttons/button";
import InputEmail from "../../../components/form/inputs/input-email";
import { InputPhone } from "../../../components/form/inputs/input-phone";
import InputText from "../../../components/form/inputs/input-text";
import InputPassword from "../../../components/form/inputs/input-password";
import InputPasswordConfirm from "../../../components/form/inputs/input-password-confirm";
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
	const { handleSubmit, control, watch } = useForm<IRegisterForm>({
		mode: "onChange",
		reValidateMode: "onBlur",
		defaultValues,
	});

	const handleSubmitButtonClick: SubmitHandler<IRegisterForm> = (values) => {
		onSubmit(values);
	};

	return (
		<Form sx={{ marginBottom: 4 }}>
			<InputText
				control={control}
				name="firstName"
				required
				label="Имя"
			/>
			<InputText
				control={control}
				name="lastName"
				required
				label="Фамилия"
			/>
			<InputPhone control={control} name="phone" />
			<InputEmail control={control} name="email" required />
			<InputPassword control={control} name="password" />
			<InputPasswordConfirm
				control={control}
				name="confirmPassword"
				password={watch("password")}
			/>
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
