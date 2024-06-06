import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import Form from "../../../components/form/form";

interface IProps {
	onSubmitAsync: (values: ILoginByPhoneRequest) => Promise<void>;
	error: string;
}
export default function LoginByPhoneForm({ onSubmitAsync, error }: IProps) {
	return (
		<Form<ILoginByPhoneRequest>
			defaultValues={{
				password: "",
				phone: "",
			}}
			onSubmitAsync={onSubmitAsync}
			minHeight={210}
			error={error}
			fields={(builder) =>
				builder
					.phone({
						name: "phone",
					})!
					.password({
						name: "password",
					})
			}
		/>
	);
}
