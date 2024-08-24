import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import Form from "../../../components/form/form";
interface IProps {
	onSubmitAsync: (values: ILoginByEmailRequest) => Promise<void>;
	loading: boolean;
}
export default function LoginByEmailForm({ onSubmitAsync, loading }: IProps) {
	const sk = useAppSelector((state) => state.page.loading);
	return (
		<Form
			defaultValues={{
				password: "",
				email: "",
			}}
			loading={loading || sk}
			onSubmit={onSubmitAsync}
			actions={([submit]) => [
				{ ...submit, position: "center", value: "Войти" },
			]}
			fields={(builder) =>
				builder.email({ name: "email", required: true }).password({
					name: "password",
					validationRequired: false,
				})
			}
		/>
	);
}
