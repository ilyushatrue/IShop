import { LockOutlined } from "@mui/icons-material";
import Template, { IFormField } from "../Base/Template";
import * as Yup from "yup";

const initialValues = {
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("Ввод обязателен"),
	phone: Yup.string()
		.test(
			"maxDigits",
			"Некорректный номер",
			(value) => value!.replace(/\D/g, "").length === 11
		)
		.required("Ввод обязателен"),
	email: Yup.string().email("Некорректный email"),
	password: Yup.string()
		.min(6, "Минимум 6 символов")
		.required("Ввод обязателен"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Пароли не совпадают")
		.required("Ввод обязателен"),
});

const registerFields: IFormField[] = [
	{
		name: "firstName",
		label: "Имя",
		placeholder: "Введите имя",
		isRequired: true,
	},
	{
		name: "lastName",
		label: "Фамилия",
		placeholder: "Введите фамилию",
	},
	{
		name: "phone",
		label: "Номер телефона",
		placeholder: "Введите номер телефона",
		isRequired: true,
	},
	{
		name: "email",
		label: "Email",
		placeholder: "Введите email",
	},
	{
		name: "password",
		label: "Пароль",
		placeholder: "Введите пароль",
		isRequired: true,
		type: "password",
	},
	{
		name: "confirmPassword",
		label: "Подтверждение пароля",
		placeholder: "Повторите пароль",
		isRequired: true,
		type: "password",
	},
];

interface IProps {
	sm?: boolean;
}
export default function Register({ sm = false }: IProps) {
	return (
		<Template
			sm={sm}
			validationSchema={validationSchema}
			initialValues={initialValues}
			avatarChildren={<LockOutlined />}
			fields={registerFields}
			title="Регистрация"
			buttonLabel="Зарегистрироваться"
		/>
	);
}
