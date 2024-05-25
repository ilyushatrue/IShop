import React from "react";
import { LockOutlined } from "@mui/icons-material";
import {
	Link,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginByEmail from "./login-by-email";
import LoginByPhone from "./login-by-phone";
import Template from "../base/template";

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
	const navigate = useNavigate();

	function handleForgotPassword() {
		//navigate("/register");
	}

	const handleAuthTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		authType: AuthType
	) => {
		if (authType !== null) setAuthType(authType);
	};

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
				<LoginByEmail onLogin={onLogin} />
			) : (
				<LoginByPhone onLogin={onLogin} />
			)}

			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Забыли пароль?
				<Link onClick={()=>{console.log(1);onToRegisterClick();}} marginLeft={1}>
					Восстановить
				</Link>
			</Typography>

			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Нет аккаунта?
				<Link onClick={()=>{console.log(1);onToRegisterClick();}} marginLeft={1}>
					Зарегистрироваться
				</Link>
			</Typography>
		</Template>
	);
}
