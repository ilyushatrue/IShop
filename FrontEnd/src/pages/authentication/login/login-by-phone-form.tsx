import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import Form from "../../../components/form/form";

interface IProps {
	onSubmitAsync: (values: ILoginByPhoneRequest) => Promise<void>;
	loading: boolean;
}
export default function LoginByPhoneForm({ onSubmitAsync, loading }: IProps) {
	return (
		<Form<ILoginByPhoneRequest>
			defaultValues={{
				password: "",
				phone: "",
			}}
			onSubmit={onSubmitAsync}
			minHeight={210}
			loading={loading}
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
