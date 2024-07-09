import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import Form from "../../../components/form/form";
interface IProps {
	onSubmitAsync: (values: ILoginByEmailRequest) => Promise<void>;
	loading: boolean;
}
export default function LoginByEmailForm({ onSubmitAsync, loading }: IProps) {
	console.log(loading);
	return (
		<Form
			defaultValues={{
				password: "",
				email: "",
			}}
			minHeight={210}
			loading={loading}
			onSubmit={onSubmitAsync}
			actions={([submit]) => [
				{ ...submit, position: "center", label: "Войти" },
			]}
			fields={(builder) =>
				builder
					.email({ name: "email", required: true, enabled: !loading })
					.password({
						name: "password",
						enabled: !loading,
						validationRequired: false,
						required: true,
					})
			}
		/>
	);
}
