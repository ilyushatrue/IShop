import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import Form from "../../../components/form/form";
interface IProps {
	onSubmit: (values: ILoginByEmailRequest) => void;
}
export default function LoginByEmailForm({ onSubmit }: IProps) {
	return (
		<Form<ILoginByEmailRequest>
			defaultValues={{
				password: "",
				email: "",
			}}
			minHeight={210}
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
