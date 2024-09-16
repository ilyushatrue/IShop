import { LockOutlined } from "@mui/icons-material";
import { IRegisterRequest } from "../../../api/contracts/authentication/register-request.interface";
import { Link, Typography } from "@mui/material";
import Template from "../template";
import RegisterForm from "./register-form";
import useApi from "../../../api/hooks/use-api.hook";
import AuthApi from "../../../api/endpoints/auth.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../../components/dialogs/confirm-dialog";

interface IProps {
	onToLoginClick: () => void;
}
export default function Register({ onToLoginClick }: IProps) {
	const navigate = useNavigate();
	const [isEmailConfirmationDialogOn, setIsEmailConfirmationDialogOn] =
		useState(false);
	const { fetchAsync, isFetching } = useApi();

	async function handleRegisterAsync(request: IRegisterRequest) {
		await fetchAsync({
			request: AuthApi.registerAsync(request),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then(() => setIsEmailConfirmationDialogOn(true))
			.catch(() => {});
	}

	return (
		<Template avatarChildren={<LockOutlined />} title="Регистрация">
			<RegisterForm onSubmit={handleRegisterAsync} loading={isFetching} />
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Уже есть аккант?
				<Link onClick={onToLoginClick} marginLeft={1}>
					Войти
				</Link>
			</Typography>
			<ConfirmDialog
				onConfirm={() => {
					setIsEmailConfirmationDialogOn(false);
					navigate("/");
				}}
				confirmText="Понятно"
				open={isEmailConfirmationDialogOn}
				title="Подтверждение email"
				content="На указанную электронную почту была отправлена ссылка для подтверждения учетной записи. Перейдите по ней для получения доступа к личному кабинету."
				onClose={() => {
					setIsEmailConfirmationDialogOn(false);
					navigate("/");
				}}
			/>
		</Template>
	);
}
