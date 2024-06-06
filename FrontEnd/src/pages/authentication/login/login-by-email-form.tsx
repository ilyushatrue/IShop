import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import Form from "../../../components/form/form";
interface IProps {
	onSubmitAsync: (values: ILoginByEmailRequest) => Promise<void>;
	error: string
}
export default function LoginByEmailForm({ onSubmitAsync, error }: IProps) {
	return (
		<Form<ILoginByEmailRequest>
			defaultValues={{
				password: "",
				email: "",
			}}
			minHeight={210}
			onSubmitAsync={onSubmitAsync}
			error={error}
			fields={(builder) =>
				builder
					.email({ name: "email", required: true })!
					.password({
						name: "password",
						required: true,
					})
			}
		/>
	);
}
