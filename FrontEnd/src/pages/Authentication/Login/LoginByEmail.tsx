import { ILoginByEmailRequest } from "../../../api/interfaces/authentication/ILoginByEmailRequest";
import * as Yup from "yup";
import { IFormField } from "../../../components/input/fields/IFormField";
import ValidationForm from "../../../components/input/form/ValidationForm";

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

	async function login(data: ILoginByEmailRequest) {
		try {
			let url = "http://localhost:5261/auth/login-by-email";
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const result = await response.json();
				onLogin()
			} else {
				console.error("Error while server request");
			}
		} catch (error) {}
	}

	return (
		<ValidationForm<ILoginByEmailRequest>
			initialValues={{ email: "", password: "" }}
			onSubmit={(values, props) => login(values)}
			fields={loginFields}
			buttonLabel="Войти"
			validationSchema={emailValidationSchema}
		/>
	);
}
