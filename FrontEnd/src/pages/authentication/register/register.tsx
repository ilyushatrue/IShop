import { LockOutlined } from "@mui/icons-material";
import { IRegisterRequest } from "../../../api/contracts/authentication/register-request.interface";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Template from "../base/template";
import api from "../../../api/apiAccessor";
import RegisterForm from "./register-form";
interface IRegisterFormField extends IRegisterRequest {
	confirmPassword: string;
}

interface IProps {
	sm?: boolean;
	onRegister: () => void;
	onToLoginClick: () => void;
}
export default function Register({
	sm = false,
	onRegister,
	onToLoginClick,
}: IProps) {
	const navigate = useNavigate();

	function handleSubmit(data: IRegisterFormField) {
		data.phone = data.phone.replace(/[^\d]/g, "");
		register(data);
	}

	async function register(data: IRegisterRequest) {
		try {
			const url = "/auth/register";
			const result = await api.postAsync(url, data);
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Template sm={sm} avatar={<LockOutlined />} title="Регистрация">

			<RegisterForm onSubmit={handleSubmit}/>
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Уже есть аккант?
				<Link onClick={onToLoginClick} marginLeft={1}>
					Войти
				</Link>
			</Typography>
		</Template>
	);
}
