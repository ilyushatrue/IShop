import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import Form from "../../../components/form/form";
interface IProps {
	onSubmit: (values: ILoginByEmailRequest) => void;
}
export default function LoginByEmailForm({ onSubmit }: IProps) {
	console.log("loginform");
	return (
		<Form<ILoginByEmailRequest>
			defaultValues={{
				password: "",
				email: "",
			}}
			onSubmit={onSubmit}
			fields={(builder) =>
				builder
					.addEmailInput({ name: "email", required: true })!
					.addPasswordInput({
						name: "password",
						required: true,
					})
			}
		/>
	);
}
