import { LockOutlined } from "@mui/icons-material";
import {
	Link,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Template from "../Base/Template";
import { ILoginByEmailRequest } from "../../../api/interfaces/authentication/ILoginByEmailRequest";
import * as Yup from "yup";
import { IFormField } from "../../../components/input/fields/IFormField";
import ValidationForm from "../../../components/input/form/ValidationForm";
import { ILoginByPhoneRequest } from "../../../api/interfaces/authentication/ILoginByPhoneRequest";

type AuthType = "phone" | "email";

const emailValidationSchema = Yup.object().shape({
	email: Yup.string().email("Некорректный email"),
	password: Yup.string()
		.min(6, "Недостаточно символов")
		.required("Ввод обязателен"),
});
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
}
export default function Login({ sm = false }: IProps) {
	const [authType, setAuthType] = useState<AuthType>("email");
	const navigate = useNavigate();
	const loginFields = useMemo<IFormField[]>(
		() => [
			{
				name: authType === "email" ? "email" : "phone",
				label: authType === "email" ? "Эл. почта" : "Номер телефона",
				placeholder:
					authType === "email"
						? "Введите email"
						: "Введите номер телефона",
				isRequired: true,
			},
			{
				name: "password",
				label: "Пароль",
				placeholder: "Введите пароль",
				isRequired: true,
				type: "password",
			},
		],
		[authType]
	);
	function handleForgotPassword() {
		navigate("/register");
	}

	const handleAuthTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		authType: AuthType
	) => {
		setAuthType(authType);
	};

	function handleSubmit(data: any) {
		if (authType === "email") {
			login<ILoginByEmailRequest>({
				email: data.email,
				password: data.password,
			});
		} else {
			login<ILoginByPhoneRequest>({
				phone: data.phone,
				password: data.password,
			});
		}
	}

	async function login<T extends ILoginByEmailRequest | ILoginByPhoneRequest>(
		data: T
	) {
		try {
			let url = "http://localhost:5261/auth/login-by-";
			url = url + (authType === "email" ? "email" : "phone");
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const result = await response.json();
				console.log(result);
			} else {
				console.log("Error while server request");
			}
		} catch (error) {}
	}

	return (
		<Template sm={sm} avatar={<LockOutlined />} title={"Войти"}>
			<ToggleButtonGroup
				fullWidth
				color="primary"
				value={authType}
				exclusive
				sx={{ marginY: 1 }}
				onChange={handleAuthTypeChange}
			>
				<ToggleButton value="email" sx={{ fontSize: 11.5 }}>
					Почта
				</ToggleButton>
				<ToggleButton value="phone" sx={{ fontSize: 11.5 }}>
					Номер телефона
				</ToggleButton>
			</ToggleButtonGroup>

			{authType === "email" ? (
				<ValidationForm<ILoginByEmailRequest>
					initialValues={{ email: "", password: "" }}
					onSubmit={(values, props) => handleSubmit(values)}
					fields={loginFields}
					buttonLabel="Войти"
					validationSchema={emailValidationSchema}
				/>
			) : (
				<ValidationForm<ILoginByPhoneRequest>
					initialValues={{ phone: "", password: "" }}
					onSubmit={(values, props) => handleSubmit(values)}
					fields={loginFields}
					buttonLabel="Войти"
					validationSchema={phoneValidationSchema}
				/>
			)}

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
