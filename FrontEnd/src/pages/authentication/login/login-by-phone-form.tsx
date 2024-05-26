import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import { useEffect, useRef } from "react";
import FormBuilder, { TFormRef } from "../../../components/form/form-builder";

interface IProps {
	sm?: boolean;
	onSubmit: (values: ILoginByPhoneRequest) => void;
}
export default function LoginByPhoneForm({ sm = false, onSubmit }: IProps) {
	const formBuilder = useRef<TFormRef<ILoginByPhoneRequest>>(null);

	useEffect(() => {
		formBuilder.current?.addPhoneInput({ name: "phone", required: true });
		formBuilder.current?.addPasswordInput({
			name: "password",
			required: true,
		});
	}, []);

	return (
		<FormBuilder<ILoginByPhoneRequest>
			defaultValues={{
				password: "",
				phone: "",
			}}
			onSubmit={onSubmit}
			ref={formBuilder}
		/>
	);
}
