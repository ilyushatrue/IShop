import * as Yup from "yup";
import { IFormField } from "../../../components/input/fields/IFormField";
import ValidationForm from "../../../components/input/form/validation-form";
import { ILoginByPhoneRequest } from "../../../api/interfaces/authentication/ILoginByPhoneRequest";
import api from "../../../api/apiAccessor";

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
	onLogin: () => void;
}
export default function LoginByPhone({ sm = false, onLogin }: IProps) {
	async function login(data: ILoginByPhoneRequest) {
		try {
			let url = "auth/login-by-phone";
			const fetchResult = await api.postAsync(url, data);
			console.log(fetchResult);
			onLogin()
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
