import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import Form from "../../../components/form/form";

interface IProps {
	sm?: boolean;
	onSubmit: (values: ILoginByPhoneRequest) => void;
}
export default function LoginByPhoneForm({ sm = false, onSubmit }: IProps) {
	return (
		<Form<ILoginByPhoneRequest>
			defaultValues={{
				password: "",
				phone: "",
			}}
			onSubmit={onSubmit}
			minHeight={210}
			fields={(builder) =>
				builder
					.addPhoneInput({
						name: "phone",
						required: true,
					})!
					.addPasswordInput({
						name: "password",
						required: true,
					})
			}
		/>
	);
}
