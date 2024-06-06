import { LockOutlined } from "@mui/icons-material";
import { IRegisterRequest } from "../../../api/contracts/authentication/register-request.interface";
import { Link, Typography } from "@mui/material";
import Template from "../base/template";
import RegisterForm from "./register-form";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import { registerAsync } from "../../../store/user.slice";
import { useState } from "react";

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
		if (result.meta.requestStatus === "fulfilled") {
			window.location.reload();
		} else {
			setError("authError");
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
