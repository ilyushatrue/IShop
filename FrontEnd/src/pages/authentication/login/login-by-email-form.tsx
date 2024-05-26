import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import FormBuilder, { TFormRef } from "../../../components/form/form-builder";
import { useEffect, useRef } from "react";
interface IProps {
	onSubmit: (values: ILoginByEmailRequest) => void;
}
export default function LoginByEmailForm({ onSubmit }: IProps) {
	const formBuilder = useRef<TFormRef<ILoginByEmailRequest>>(null);

	useEffect(() => {
		formBuilder.current?.addEmailInput({ name: "email", required: true });
		formBuilder.current?.addPasswordInput({
			name: "password",
			required: true,
		});
	}, []);
	return (
		<FormBuilder<ILoginByEmailRequest>
			defaultValues={{
				password: "",
				email: "",
			}}
			onSubmit={onSubmit}
			ref={formBuilder}
		/>
	);
}
