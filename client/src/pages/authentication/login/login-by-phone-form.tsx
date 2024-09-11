import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import Button from "../../../components/buttons/button";
import InputPassword from "../../../components/form/inputs/input-password";
import FormActions from "../../../components/form/form-actions";
import { InputPhone } from "../../../components/form/inputs/input-phone";
import Form from "../../../components/form/form";

interface IProps {
	onSubmit: (values: ILoginByPhoneRequest) => void;
	loading: boolean;
}
export default function LoginByPhoneForm({ onSubmit, loading }: IProps) {
	const defaultValues = {
		password: "",
		phone: "7",
	};
	const { handleSubmit, control } = useForm<ILoginByPhoneRequest>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		defaultValues,
	});

	const handleSubmitButtonClick: SubmitHandler<ILoginByPhoneRequest> = (
		values
	) => {
		onSubmit(values);
	};

	return (
		<Form
			onEnterKeyDown={handleSubmit(handleSubmitButtonClick)}
			sx={{ marginBottom: 4 }}
		>
			<InputPhone control={control} name="phone" />
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
