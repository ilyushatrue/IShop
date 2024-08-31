import { LockOutlined } from "@mui/icons-material";
import { IRegisterRequest } from "../../../api/contracts/authentication/register-request.interface";
import { Link, Typography } from "@mui/material";
import Template from "../template";
import RegisterForm from "./register-form";
import useApi from "../../../api/hooks/use-api.hook";
import apiAuth from "../../../api/endpoints/auth.api";
import { useState } from "react";
import Dialog from "../../../components/dialog";
import { useNavigate } from "react-router-dom";

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
			request: apiAuth.registerAsync(request),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		}).then(() => setIsEmailConfirmationDialogOn(true));
	}

	return (
		<Template avatarChildren={<LockOutlined />} title="Регистрация">
			<RegisterForm
				onSubmit={handleRegisterAsync}
				loading={isFetching}
			/>
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Уже есть аккант?
				<Link onClick={onToLoginClick} marginLeft={1}>
					Войти
				</Link>
			</Typography>
			<Dialog
				onEnterKeyPress={() => {
					setIsEmailConfirmationDialogOn(false);
					navigate("/");
				}}
				open={isEmailConfirmationDialogOn}
				title="Подтверждение email"
				content="На указанную электронную почту была отправлена ссылка для подтверждения учетной записи. Перейдите по ней для получения доступа к личному кабинету."
				onClose={() => {
					setIsEmailConfirmationDialogOn(false);
					navigate("/");
				}}
				// actions={() => [
				// 	{
				// 		value: "Понятно",
				// 		componentProps: {
				// 			onClick: () => {
				// 				setIsEmailConfirmationDialogOn(false);
				// 				navigate("/");
				// 			},
				// 		},
				// 	},
				// ]}
				
			/>
		</Template>
	);
}
