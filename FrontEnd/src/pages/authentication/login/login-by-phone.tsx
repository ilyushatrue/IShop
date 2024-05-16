import * as Yup from "yup";
import { IFormField } from "../../../components/input/fields/IFormField";
import ValidationForm from "../../../components/input/form/validation-form";
import { ILoginByPhoneRequest } from "../../../api/interfaces/authentication/ILoginByPhoneRequest";
import api from "../../../api/apiAccessor";
import { useLazyCurrentQuery, useLoginByEmailMutation } from "../../../api/userApi";

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
	const [loginByEmail, { isLoading }] = useLoginByEmailMutation;
	const [triggerCurrentQuery] = useLazyCurrentQuery();



	async function handleSubmit(data: ILoginByPhoneRequest){
		try{
			await login(data).unwrap()
		}catch(eeror){

		}
	}
	async function tryLogin(data: ILoginByPhoneRequest) {
		try {
			let url = "auth/login-by-phone";
			const fetchResult = await api.postAsync(url, data);
			console.log(fetchResult);
			onLogin();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<ValidationForm
			initialValues={{ phone: "", password: "" }}
			onSubmit={(values, props) => tryLogin(values)}
			fields={loginFields}
			buttonLabel="Войти"
			validationSchema={phoneValidationSchema}
		/>
	);
}
