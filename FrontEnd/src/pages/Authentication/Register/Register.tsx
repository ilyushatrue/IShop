import { LockOutlined } from "@mui/icons-material";
import Template from "../Base/Template";
import * as Yup from "yup";
import { IRegisterRequest } from "../../../api/interfaces/authentication/IRegisterRequest";
import { IFormField } from "../../../components/input/fields/IFormField";
import ValidationForm from "../../../components/input/form/ValidationForm";

interface IRegisterFormField extends IRegisterRequest {
	confirmPassword: string;
}

const initialValues: IRegisterFormField = {
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

const controlFields: IFormField[] = [
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
	function handleSubmit(data: IRegisterFormField) {
		data.phone = data.phone.replace(/[^\d]/g, "");
		register(data);
	}

	async function register(data: IRegisterRequest) {
		try {
			const response = await fetch(
				"http://localhost:5261/auth/register",
				{
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				const result = await response.json();
				console.log(result);
			} else {
				console.log("Error while server request");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Template sm={sm} avatar={<LockOutlined />} title="Регистрация">
			<ValidationForm
				initialValues={initialValues}
				onSubmit={(values, props) => handleSubmit(values)}
				fields={controlFields}
				buttonLabel="Зарегистрироваться"
				validationSchema={validationSchema}
			/>
		</Template>
	);
}
