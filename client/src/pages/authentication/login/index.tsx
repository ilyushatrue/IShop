import React, { useEffect } from "react";
import { LockOutlined } from "@mui/icons-material";
import {
	Box,
	Link,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useState } from "react";
import Template from "../template";
import LoginByEmailForm from "./login-by-email-form";
import LoginByPhoneForm from "./login-by-phone-form";
import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import { redirect } from "../../../app/helpers/redirect";
import useApi from "../../../api/hooks/use-api.hook";
import apiAuth from "../../../api/endpoints/auth.api";
import ResetPasswordDialog from "./reset-password-dialog";
import EmailConfirmAlreadySentDialog from "./email-confirm-already-sent-dialog";
import productsApi from "../../../api/endpoints/products.api";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";
import { IProduct } from "../../../api/interfaces/product/product.interface";

type AuthType = "phone" | "email";

interface IProps {
	onToRegisterClick: () => void;
}

export default function Login({ onToRegisterClick }: IProps) {
	const { sm } = useMediaQueryContext();

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
	const { fetchAsync, isFetching } = useApi();
	useEffect(() => {
		console.log(sm);
	}, [sm]);

	const handleAuthTypeChange = (
		event: React.MouseEvent<HTMLElement>,
		authType: AuthType
	) => {
		if (!!authType) setAuthType(authType);
	};

	async function handleLoginByPhoneAsync(request: ILoginByPhoneRequest) {
		await fetchAsync({
			request: apiAuth.loginByPhoneAsync(request),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then(handleSuccessfulLoginAsync)
			.catch((error: Error) => {
				if (error.cause === "email-not-confirmed") {
					setIsEmailAlreadyConfirmedDialogOn({
						is: true,
						email: "email",
					});
				}
			});
	}

	async function handleLoginByEmailAsync(request: ILoginByEmailRequest) {
		await fetchAsync({
			request: apiAuth.loginByEmailAsync(request),
			onError: (handler) => handler.log().popup().throw(),
			triggerPageLoader: true,
		})
			.then(handleSuccessfulLoginAsync)
			.catch((error: Error) => {
				if (error.cause === "email-not-confirmed") {
					setIsEmailAlreadyConfirmedDialogOn({
						is: true,
						email: request.email,
					});
				}
			});
	}

	async function handleSuccessfulLoginAsync() {
		const favoriteProducts =
			window.localStorage.getItem("favorite-products");
		if (favoriteProducts) {
			const values = (JSON.parse(favoriteProducts) as IProduct[]).map(
				(item) => ({ productId: item.id, value: true })
			);
			await fetchAsync({
				request: productsApi.toFavoritesRangeAsync(values),
				triggerPageLoader: true,
			}).then(() => window.localStorage.removeItem("favorite-products"));
		}
		redirect("/my/profile");
	}

	async function handleResetPasswordAsync(email: string) {
		setIsResetPasswordDialogOn(false);
		await fetchAsync({
			request: apiAuth.sendResetPasswordEmailAsync(email),
			onSuccess: (handler) =>
				handler.popup(
					"Сообщение о смене пароля отправлено на эл. почту"
				),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		});
	}

	async function handleResendEmailAsync(email: string) {
		setIsEmailAlreadyConfirmedDialogOn((prev) => ({ ...prev, is: false }));
		await fetchAsync({
			request: apiAuth.sendEmailConfirmEmailAsync(email),
			onSuccess: (handler) =>
				handler.popup(
					"Сообщение о смене пароля отправлено на эл. почту"
				),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		});
	}
	return (
		<>
			<Template avatarChildren={<LockOutlined />} title={"Войти"}>
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
						<Typography
							variant="body2"
							textTransform={"none"}
							fontWeight={600}
						>
							Почта
						</Typography>
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
						<Typography
							variant="body2"
							textTransform={"none"}
							fontWeight={600}
						>
							Номер телефона
						</Typography>
					</ToggleButton>
				</ToggleButtonGroup>
				<Box sx={{ display: authType === "email" ? "block" : "none" }}>
					<LoginByEmailForm
						loading={isFetching}
						onSubmit={handleLoginByEmailAsync}
					/>
				</Box>
				<Box sx={{ display: authType === "phone" ? "block" : "none" }}>
					<LoginByPhoneForm
						loading={isFetching}
						onSubmit={handleLoginByPhoneAsync}
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
				onSubmit={(values) => handleResetPasswordAsync(values.email)}
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
