import * as Yup from "yup";
import { IFormField } from "../../../components/input/fields/IFormField";
import ValidationForm from "../../../components/input/form/ValidationForm";
import { ILoginByPhoneRequest } from "../../../api/interfaces/authentication/ILoginByPhoneRequest";

const loginFields: IFormField[] = [
	{
		name: "phone",
		label: "Номер телефона",
		placeholder: "Введите номер телефона",
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

const phoneValidationSchema = Yup.object().shape({
	phone: Yup.string()
		.test(
			"maxDigits",
			"Некорректный номер",
			(value) => value!.replace(/\D/g, "").length === 11
		)
		.required("Ввод обязателен"),
	password: Yup.string()
		.min(6, "Недостаточно символов")
		.required("Ввод обязателен"),
});

interface IProps {
	sm?: boolean;
	onLogin: ()=>void;
}
export default function LoginByPhone({ sm = false, onLogin }: IProps) {
	async function login(data: ILoginByPhoneRequest) {
		try {
			let url = "http://localhost:5261/auth/login-by-phone";
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
		<ValidationForm<ILoginByPhoneRequest>
			initialValues={{ phone: "", password: "" }}
			onSubmit={(values, props) => login(values)}
			fields={loginFields}
			buttonLabel="Войти"
			validationSchema={phoneValidationSchema}
		/>
	);
}
