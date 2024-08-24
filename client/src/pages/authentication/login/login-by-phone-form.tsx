import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import Form from "../../../components/form/form";

interface IProps {
	onSubmitAsync: (values: ILoginByPhoneRequest) => Promise<void>;
	loading: boolean;
}
export default function LoginByPhoneForm({ onSubmitAsync, loading }: IProps) {
	return (
		<Form
			defaultValues={{
				password: "",
				phone: "7",
			}}
			onSubmit={onSubmitAsync}
			loading={loading}
			actions={([submit]) => [
				{
					...submit,
					position: "center",
					value: "Войти",
					componentProps: {
						...submit.componentProps,
						fullWidth: true,
					},
				},
			]}
			fields={(builder) =>
				builder
					.phone({
						name: "phone",
					})
					.password({
						name: "password",
						validationRequired: false,
					})
			}
		/>
	);
}
