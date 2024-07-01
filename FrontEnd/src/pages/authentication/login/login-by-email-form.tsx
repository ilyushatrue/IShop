import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import Form from "../../../components/form/form";
interface IProps {
	onSubmitAsync: (values: ILoginByEmailRequest) => Promise<void>;
	loading: boolean;
}
export default function LoginByEmailForm({ onSubmitAsync, loading }: IProps) {
	return (
		<Form<ILoginByEmailRequest>
			defaultValues={{
				password: "",
				email: "",
			}}
			minHeight={210}
			loading={loading}
			onSubmit={onSubmitAsync}
			submitButtonText="Войти"
			fields={(builder) =>
				builder.email({ name: "email", required: true }).password({
					name: "password",
					required: true,
				})
			}
		/>
	);
}
