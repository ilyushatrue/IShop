import { ILoginByEmailRequest } from "../../../api/interfaces/authentication/login-by-email-request.interface";
import * as Yup from "yup";
import { IFormField } from "../../../components/input/fields/IFormField";
import ValidationForm from "../../../components/input/form/validation-form";
import { useLazyCurrentQuery, useLoginByEmailMutation } from "../../../api/userApi";

const emailValidationSchema = Yup.object().shape({
	email: Yup.string().email("Некорректный email").required("Ввод обязателен"),
	password: Yup.string()
		.min(6, "Недостаточно символов")
		.required("Ввод обязателен"),
});

const loginFields: IFormField[] = [
	{
		name: "email",
		label: "Эл. почта",
		placeholder: "Введите email",
		isRequired: true,
	},
	{
		name: "password",
		label: "Пароль",
		placeholder: "Введите пароль",
		isRequired: true,
		type: "password",
	},
];

interface IProps {
	sm?: boolean;
	onLogin: () => void;
}
export default function LoginByEmail({ sm = false, onLogin }: IProps) {
	const [login, { isLoading }] = useLoginByEmailMutation();
	const [triggerCurrentQuery] = useLazyCurrentQuery();

	async function handleSubmit(data: ILoginByEmailRequest) {
		try {
			await login(data).unwrap();
		} catch (error) {
			console.error(error)
		}
	}
	// async function login(data: ILoginByEmailRequest) {
	// 	try {
	// 		let url = "/auth/login-by-email";
	// 		const fetchResult = await api.postAsync(url, data);
	// 		console.log(fetchResult);
	// 		onLogin();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }

	return (
		<ValidationForm
			initialValues={{ email: "", password: "" }}
			onSubmit={(values, props) => handleSubmit(values)}
			fields={loginFields}
			buttonLabel="Войти"
			validationSchema={emailValidationSchema}
		/>
	);
}
