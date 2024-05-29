import { LockOutlined } from "@mui/icons-material";
import { IRegisterRequest } from "../../../api/contracts/authentication/register-request.interface";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Template from "../base/template";
import RegisterForm from "./register-form";
import { useAppDispatch } from "../../../app/hooks";
import { register } from "../../../store/user.slice";

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
	const dispatch = useAppDispatch();
	async function handleRegisterAsync(request: IRegisterRequest) {
		request.phone = request.phone.replace(/[^\d]/g, "");
		const result = await dispatch(register(request));
		if (result.payload) {
			console.log(result.payload);
			onRegister();
		}
	}

	return (
		<Template sm={sm} avatar={<LockOutlined />} title="Регистрация">
			<RegisterForm onSubmit={handleRegisterAsync} />
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Уже есть аккант?
				<Link onClick={onToLoginClick} marginLeft={1}>
					Войти
				</Link>
			</Typography>
		</Template>
	);
}
