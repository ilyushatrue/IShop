import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import Form from "../../../components/form/form";

interface IProps {
	onSubmitAsync: (values: ILoginByPhoneRequest) => Promise<void>;
}
export default function LoginByPhoneForm({ onSubmitAsync }: IProps) {
	return (
		<Form<ILoginByPhoneRequest>
			defaultValues={{
				password: "",
				phone: "",
			}}
			onSubmitAsync={onSubmitAsync}
			minHeight={210}
			submitButtonText="Войти"
			fields={(builder) =>
				builder
					.phone({
						name: "phone",
					})
					.password({
						name: "password",
					})
			}
		/>
	);
}
