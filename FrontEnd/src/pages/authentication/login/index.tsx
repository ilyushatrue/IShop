import React from "react";
import { LockOutlined } from "@mui/icons-material";
import {
	Link,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useState } from "react";
import Template from "../base/template";
import LoginByEmailForm from "./login-by-email-form";
import LoginByPhoneForm from "./login-by-phone-form";
import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import {
	loginByEmailAsync,
	loginByPhoneAsync,
} from "../../../store/user.slice";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import { ApiResponse } from "../../../api/api";

type AuthType = "phone" | "email";

interface IProps {
	sm?: boolean;
	onToRegisterClick: () => void;
}
export default function Login({ sm = false, onToRegisterClick }: IProps) {
	const [authType, setAuthType] = useState<AuthType>("email");
	const dispatch = useAppDispatch();
	const [error, setError] = useState("");

	const handleAuthTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		authType: AuthType
	) => {
		setError("");
		if (!!authType) setAuthType(authType);
	};

	async function handleLoginByPhoneAsync(request: ILoginByPhoneRequest) {
		const result = await dispatch(loginByPhoneAsync(request));
		const payload = result.payload as ApiResponse<undefined>;
		if (payload.ok) {
			window.location.reload();
		} else {
			switch (payload.status) {
				case 500:
					setError(
						"Ошибка подключения. Обратитесь к администратору."
					);
					break;
				case 404:
					setError("Неверный логин или пароль.");
					break;
				default:
					setError("Неверный логин или пароль.");
			}
		}
	}
	async function handleLoginByEmailAsync(request: ILoginByEmailRequest) {
		const result = await dispatch(loginByEmailAsync(request));
		const payload = result.payload as ApiResponse<undefined>;
		if (payload.ok) {
			window.location.reload();
		} else {
			switch (payload.status) {
				case 500:
					setError(
						"Ошибка подключения. Обратитесь к администратору."
					);
					break;
				case 404:
					setError("Неверный логин или пароль.");
					break;
				default:
					setError("Неверный логин или пароль.");
			}
		}
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
				<ToggleButton
					value="email"
					sx={{ fontSize: 11.5, borderRadius: 3 }}
				>
					Почта
				</ToggleButton>
				<ToggleButton
					value="phone"
					sx={{ fontSize: 11.5, borderRadius: 3 }}
				>
					Номер телефона
				</ToggleButton>
			</ToggleButtonGroup>

			{authType === "email" ? (
				<LoginByEmailForm
					onSubmitAsync={handleLoginByEmailAsync}
					error={error}
				/>
			) : (
				<LoginByPhoneForm
					onSubmitAsync={handleLoginByPhoneAsync}
					error={error}
				/>
			)}
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Забыли пароль?
				<Link onClick={onToRegisterClick} marginLeft={1}>
					Восстановить
				</Link>
			</Typography>

			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Нет аккаунта?
				<Link onClick={onToRegisterClick} marginLeft={1}>
					Зарегистрироваться
				</Link>
			</Typography>
		</Template>
	);
}
