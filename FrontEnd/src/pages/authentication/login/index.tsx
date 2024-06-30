import React from "react";
import { LockOutlined } from "@mui/icons-material";
import {
	Box,
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
import { setIsLoading } from "../../../store/page.slice";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import { redirect } from "../../../app/helpers/redirect";
import { usePopup } from "../../../app/hooks/use-popup.hook";
import useApi from "../../../api/hooks/use-api.hook";
import apiAuth from "../../../api/auth.api";

type AuthType = "phone" | "email";

interface IProps {
	sm?: boolean;
	onToRegisterClick: () => void;
}

const MemoizedLoginByEmailForm = React.memo(LoginByEmailForm);
const MemoizedLoginByPhoneForm = React.memo(LoginByPhoneForm);

export default function Login({ sm = false, onToRegisterClick }: IProps) {
	const [authType, setAuthType] = useState<AuthType>("email");
	const { fetchAsync } = useApi();
	const dispatch = useAppDispatch();

	const handleAuthTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		authType: AuthType
	) => {
		if (!!authType) setAuthType(authType);
	};

	async function handleLoginByPhoneAsync(request: ILoginByPhoneRequest) {
		dispatch(setIsLoading(true));
		await fetchAsync({
			request: async () => await apiAuth.loginByPhoneAsync(request),
			onSuccess: (handler) =>
				handler.do(() => redirect("/account")),
			onError: (handler) => handler.log().popup(),
		});
		dispatch(setIsLoading(false));
	}

	async function handleLoginByEmailAsync(request: ILoginByEmailRequest) {
		dispatch(setIsLoading(true));
		await fetchAsync({
			request: async () => await apiAuth.loginByEmailAsync(request),
			onSuccess: (handler) =>
				handler.do(() => redirect("/account")),
			onError: (handler) => handler.log().popup(),
		});
		dispatch(setIsLoading(false));
	}	

	return (
		<Template sm={sm} avatar={<LockOutlined />} title={"Войти"}>
			{/* <ToggleButtonGroup
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
			</ToggleButtonGroup> */}

			<Box sx={{ display: authType === "email" ? "block" : "none" }}>
				<MemoizedLoginByEmailForm
					onSubmitAsync={handleLoginByEmailAsync}
				/>
			</Box>
			<Box sx={{ display: authType === "phone" ? "block" : "none" }}>
				<MemoizedLoginByPhoneForm
					onSubmitAsync={handleLoginByPhoneAsync}
				/>
			</Box>
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
