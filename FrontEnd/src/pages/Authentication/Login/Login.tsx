import { LockOutlined } from "@mui/icons-material";
import { Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Template, { IFormField } from "../Base/Template";
import { ILoginRequest } from "../../../api/interfaces/ILoginRequest";
import * as Yup from "yup";

const initialValues = {
	login: "",
	password: "",
};

const loginFields: IFormField[] = [
	{
		name: "login",
		label: "Логин",
		placeholder: "Введите номер телефона или email",
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

const validationSchema = Yup.object().shape({
	login: Yup.string()
		.min(3, "Недостаточно символов")
		.required("Ввод обязателен"),
	password: Yup.string()
		.min(6, "Недостаточно символов")
		.required("Ввод обязателен"),
});

interface IProps{
	sm?:boolean;
}
export default function Login({sm=false}:IProps) {
	const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
	const [loginRequest, setLoginRequest] = useState<ILoginRequest>({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	function handleRememberMeChange() {
		setIsRememberMeChecked((prev) => !prev);
	}
	function handleForgotPassword() {
		navigate("/register");
	}



	return (
		<Template
			sm={sm}
			fields={loginFields}
			buttonLabel="Войти"
			validationSchema={validationSchema}
			initialValues={initialValues}
			avatarChildren={<LockOutlined />}
			title={"Войти"}
		>
			<FormControlLabel
				control={
					<Checkbox
						checked={isRememberMeChecked}
						onChange={handleRememberMeChange}
						name="rememberMe"
						color="primary"
					/>
				}
				label={<Typography variant="body2">Запомнить</Typography>}
			/>
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Забыли пароль?
				<Link onClick={handleForgotPassword} marginLeft={1}>
					Восстановить
				</Link>
			</Typography>
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Нет аккаунта?
				<Link onClick={handleForgotPassword} marginLeft={1}>
					Зарегистрироваться
				</Link>
			</Typography>
		</Template>
	);
}
