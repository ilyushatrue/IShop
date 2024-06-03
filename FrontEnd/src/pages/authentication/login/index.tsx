import React from "react";
import { ConstructionOutlined, LockOutlined } from "@mui/icons-material";
import {
	Link,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";

type AuthType = "phone" | "email";

interface IProps {
	sm?: boolean;
	onLogin: () => void;
	onToRegisterClick: () => void;
}
export default function Login({
	sm = false,
	onLogin,
	onToRegisterClick,
}: IProps) {
	const [authType, setAuthType] = useState<AuthType>("email");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const loginError = useAppSelector((state) => state.user.error);

	function handleForgotPassword() {
		//navigate("/register");
	}

	const handleAuthTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		authType: AuthType
	) => {
		if (authType !== null) setAuthType(authType);
	};

	async function handleLoginByPhoneAsync(request: ILoginByPhoneRequest) {
		await dispatch(loginByPhoneAsync(request));
		if (loginError) {
			setError(loginError);
		} else {
			window.location.reload();
		}
	}
	async function handleLoginByEmailAsync(request: ILoginByEmailRequest) {
		await dispatch(loginByEmailAsync(request));
		if (loginError) {
			setError(loginError);
		} else {
			window.location.reload();
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
				<LoginByEmailForm onSubmit={handleLoginByEmailAsync} />
			) : (
				<LoginByPhoneForm onSubmit={handleLoginByPhoneAsync} />
			)}
			{error}
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
