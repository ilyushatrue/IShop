import { LockOutlined } from "@mui/icons-material";
import { IRegisterRequest } from "../../../api/contracts/authentication/register-request.interface";
import { Link, Typography } from "@mui/material";
import Template from "../base/template";
import RegisterForm from "./register-form";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import useApi from "../../../api/hooks/use-api.hook";
import { setIsPageLoading } from "../../../store/page.slice";
import apiAuth from "../../../api/auth.api";
import { useState } from "react";
import Dialog from "../../../components/dialog";
import { useNavigate } from "react-router-dom";

interface IProps {
	sm?: boolean;
	onToLoginClick: () => void;
}
export default function Register({ sm = false, onToLoginClick }: IProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isEmailConfirmationDialogOn, setIsEmailConfirmationDialogOn] =
		useState(false);
		const { fetchAsync, isFetching } = useApi({ triggerPage: true });

	async function handleRegisterAsync(request: IRegisterRequest) {
		dispatch(setIsPageLoading(true));
		await fetchAsync({
			request: async () => await apiAuth.registerAsync(request),
			onSuccess: (handler) =>
				handler.do(() => setIsEmailConfirmationDialogOn(true)),
			onError: (handler) => handler.log().popup(),
		});
		dispatch(setIsPageLoading(false));
	}

	return (
		<Template sm={sm} avatar={<LockOutlined />} title="Регистрация">
			<RegisterForm
				onSubmitAsync={handleRegisterAsync}
				loading={isFetching}
			/>
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Уже есть аккант?
				<Link onClick={onToLoginClick} marginLeft={1}>
					Войти
				</Link>
			</Typography>
			<Dialog
				open={isEmailConfirmationDialogOn}
				title="Подтверждение email"
				content="На указанную электронную почту была отправлена ссылка для подтверждения учетной записи. Перейдите по ней для получения доступа к личному кабинету."
				onClose={() => {
					setIsEmailConfirmationDialogOn(false);
					navigate("/");
				}}
				onOk={() => {
					setIsEmailConfirmationDialogOn(false);
					navigate("/");
				}}
				actions={([ok]) => [ok]}
			/>
		</Template>
	);
}
