import React from "react";
import { LockOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { useState } from "react";
import Template from "../base/template";
import LoginByEmailForm from "./login-by-email-form";
import LoginByPhoneForm from "./login-by-phone-form";
import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import { redirect } from "../../../app/helpers/redirect";
import useApi from "../../../api/hooks/use-api.hook";
import apiAuth from "../../../api/auth.api";
import Dialog from "../../../components/dialog";
import { setIsPageLoading } from "../../../store/page.slice";
import Form from "../../../components/form/form";

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
	const { fetchAsync, isFetching } = useApi();
	const dispatch = useAppDispatch();

	const handleAuthTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		authType: AuthType
	) => {
		if (!!authType) setAuthType(authType);
	};

	async function handleLoginByPhoneAsync(request: ILoginByPhoneRequest) {
		dispatch(setIsPageLoading(true));
		await fetchAsync({
			request: async () => await apiAuth.loginByPhoneAsync(request),
			onSuccess: (handler) => handler.do(() => redirect("/account")),
			onError: (handler) => handler.log().popup(),
		});
		dispatch(setIsPageLoading(false));
	}

	async function handleLoginByEmailAsync(request: ILoginByEmailRequest) {
		dispatch(setIsPageLoading(true));
		await fetchAsync({
			request: async () => await apiAuth.loginByEmailAsync(request),
			onSuccess: (handler) => handler.do(() => redirect("/account")),
			onError: (handler) => handler.log().popup(),
		});
		dispatch(setIsPageLoading(false));
	}

	async function handleResetPasswordAsync(email: string) {
		dispatch(setIsPageLoading(true));
		setIsResetPasswordDialogOn(false);
		await fetchAsync({
			request: async () =>
				await apiAuth.sendResetPasswordEmailAsync(email),
			onSuccess: (handler) =>
				handler.popup(
					"Сообщение о смене пароля доставлено на эл. почту"
				),
			onError: (handler) => handler.log().popup(),
		});
		dispatch(setIsPageLoading(false));
	}

	return (
		<>
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
			<Dialog
				open={isResetPasswordDialogOn}
				title="Изменение пароля"
				content="На указанный адрес эл. почты будет отправлено сообщение на изменение пароля."
			>
				<Form<{ email: string }>
					defaultValues={{ email: "" }}
					fields={(builder) =>
						builder.email({ name: "email", required: true })
					}
					minHeight={80}
					loading={isFetching}
					resetButtonText="Отмена"
					onReset={() => setIsResetPasswordDialogOn(false)}
					onSubmit={(values) =>
						handleResetPasswordAsync(values.email)
					}
				/>
			</Dialog>
		</>
	);
}
