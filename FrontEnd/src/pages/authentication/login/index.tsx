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
import { redirect } from "../../../app/helpers/redirect";
import useApi from "../../../api/hooks/use-api.hook";
import apiAuth from "../../../api/auth.api";
import ResetPasswordDialog from "./reset-password-dialog";
import EmailConfirmAlreadySentDialog from "./email-confirm-already-sent-dialog";

type AuthType = "phone" | "email";

interface IProps {
	sm?: boolean;
	onToRegisterClick: () => void;
}

const MemoizedLoginByEmailForm = React.memo(LoginByEmailForm);
const MemoizedLoginByPhoneForm = React.memo(LoginByPhoneForm);

export default function Login({ sm = false, onToRegisterClick }: IProps) {
	const [authType, setAuthType] = useState<AuthType>("email");
	const [isResetPasswordDialogOn, setIsResetPasswordDialogOn] =
		useState(false);
	const [
		isEmailAlreadyConfirmedDialogOn,
		setIsEmailAlreadyConfirmedDialogOn,
	] = useState<{
		is: boolean;
		email?: string;
	}>({ is: false });
	const { fetchAsync, isFetching } = useApi({ triggerPage: true });

	const handleAuthTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		authType: AuthType
	) => {
		if (!!authType) setAuthType(authType);
	};

	async function handleLoginByPhoneAsync(request: ILoginByPhoneRequest) {
		await fetchAsync({
			request: async () => await apiAuth.loginByPhoneAsync(request),
			onSuccess: (handler) => handler.do(() => redirect("/account")),
			onError: (handler) => handler.log().popup(),
		});
	}

	async function handleLoginByEmailAsync(request: ILoginByEmailRequest) {
		await fetchAsync({
			request: async () => await apiAuth.loginByEmailAsync(request),
			onSuccess: (handler) => handler.do(() => redirect("/account")),
			onError: (handler) =>
				handler
					.log()
					.popup()
					.do((error) => {
						console.log(error);
						if (error.name === "email-not-confirmed") {
							setIsEmailAlreadyConfirmedDialogOn({
								is: true,
								email: request.email,
							});
						}
					}),
		});
	}

	async function handleResetPasswordAsync(email: string) {
		setIsResetPasswordDialogOn(false);
		await fetchAsync({
			request: async () =>
				await apiAuth.sendResetPasswordEmailAsync(email),
			onSuccess: (handler) =>
				handler.popup(
					"Сообщение о смене пароля отправлено на эл. почту"
				),
			onError: (handler) => handler.log().popup(),
		});
	}

	async function handleResendEmailAsync(email: string) {
		setIsEmailAlreadyConfirmedDialogOn((prev) => ({ ...prev, is: false }));
		await fetchAsync({
			request: async () =>
				await apiAuth.sendEmailConfirmEmailAsync(email),
			onSuccess: (handler) =>
				handler.popup(
					"Сообщение о смене пароля отправлено на эл. почту"
				),
			onError: (handler) => handler.log().popup(),
		});
	}
	return (
		<>
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
						sx={{
							fontSize: 12,
							fontWeight: 600,
							borderRadius: 3,
							"&.Mui-selected": {
								typography: { fontWeight: 800 },
							},
						}}
					>
						Почта
					</ToggleButton>
					<ToggleButton
						value="phone"
						sx={{
							fontSize: 12,
							fontWeight: 600,
							borderRadius: 3,
							"&.Mui-selected": {
								typography: { fontWeight: 800 },
							},
						}}
					>
						Номер телефона
					</ToggleButton>
				</ToggleButtonGroup>
				<Box sx={{ display: authType === "email" ? "block" : "none" }}>
					<MemoizedLoginByEmailForm
						loading={isFetching}
						onSubmitAsync={handleLoginByEmailAsync}
					/>
				</Box>
				<Box sx={{ display: authType === "phone" ? "block" : "none" }}>
					<MemoizedLoginByPhoneForm
						loading={isFetching}
						onSubmitAsync={handleLoginByPhoneAsync}
					/>
				</Box>
				<Typography sx={{ cursor: "pointer", mt: 1 }} variant="body2">
					Забыли пароль?
					<Link
						onClick={() => setIsResetPasswordDialogOn(true)}
						marginLeft={1}
					>
						Изменить
					</Link>
				</Typography>

				<Typography sx={{ cursor: "pointer", mt: 0.5 }} variant="body2">
					Нет аккаунта?
					<Link onClick={onToRegisterClick} marginLeft={1}>
						Зарегистрироваться
					</Link>
				</Typography>
			</Template>
			<ResetPasswordDialog
				onSubmit={handleResetPasswordAsync}
				loading={isFetching}
				onClose={() => setIsResetPasswordDialogOn(false)}
				open={isResetPasswordDialogOn}
			/>
			<EmailConfirmAlreadySentDialog
				email={isEmailAlreadyConfirmedDialogOn.email}
				onEmailResendRequest={() =>
					handleResendEmailAsync(
						isEmailAlreadyConfirmedDialogOn.email!
					)
				}
				onClose={() =>
					setIsEmailAlreadyConfirmedDialogOn((prev) => ({
						...prev,
						is: false,
					}))
				}
				open={isEmailAlreadyConfirmedDialogOn.is}
			/>
		</>
	);
}
