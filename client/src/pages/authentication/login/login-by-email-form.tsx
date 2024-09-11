import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import Button from "../../../components/buttons/button";
import Form from "../../../components/form/form";
import FormActions from "../../../components/form/form-actions";
import InputEmail from "../../../components/form/inputs/input-email";
import InputPassword from "../../../components/form/inputs/input-password";
interface IProps {
	onSubmit: (values: ILoginByEmailRequest) => void;
	loading: boolean;
}
export default function LoginByEmailForm({ onSubmit, loading }: IProps) {
	const { handleSubmit, control } = useForm<ILoginByEmailRequest>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		defaultValues: {
			password: "",
			email: "",
		},
	});

	const handleSubmitButtonClick: SubmitHandler<ILoginByEmailRequest> = (
		values
	) => {
		onSubmit(values);
	};

	return (
		<Form
			onEnterKeyDown={handleSubmit(handleSubmitButtonClick)}
			sx={{ marginBottom: 4 }}
		>
			<InputEmail control={control} name="email" />
			<InputPassword control={control} name="password" />
			<FormActions sx={{ justifyContent: "center" }}>
				<Button
					onClick={handleSubmit(handleSubmitButtonClick)}
					size="large"
					sx={{ width: 150, height: 50 }}
					disabled={loading}
				>
					Войти
				</Button>
			</FormActions>
		</Form>
	);
}
