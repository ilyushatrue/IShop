import { LockOutlined } from "@mui/icons-material";
import { IRegisterRequest } from "../../../api/contracts/authentication/register-request.interface";
import { Link, Typography } from "@mui/material";
import Template from "../base/template";
import RegisterForm from "./register-form";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import { registerAsync } from "../../../store/user.slice";
import { useState } from "react";
import { ApiResponse } from "../../../api/api";

interface IProps {
	sm?: boolean;
	onToLoginClick: () => void;
}
export default function Register({ sm = false, onToLoginClick }: IProps) {
	const dispatch = useAppDispatch();
	const [error, setError] = useState("");
	async function handleRegisterAsync(request: IRegisterRequest) {
		request.phone = request.phone.replace(/[^\d]/g, "");
		const result = await dispatch(registerAsync(request));
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
		<Template sm={sm} avatar={<LockOutlined />} title="Регистрация">
			<RegisterForm onSubmitAsync={handleRegisterAsync} error={error} />
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Уже есть аккант?
				<Link onClick={onToLoginClick} marginLeft={1}>
					Войти
				</Link>
			</Typography>
		</Template>
	);
}
