import { LockOutlined } from "@mui/icons-material";
import { IRegisterRequest } from "../../../api/contracts/authentication/register-request.interface";
import { Link, Typography } from "@mui/material";
import Template from "../base/template";
import RegisterForm from "./register-form";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import useApi from "../../../api/hooks/use-api.hook";
import { setIsLoading } from "../../../store/page.slice";
import apiAuth from "../../../api/auth.api";
import { redirect } from "../../../app/helpers/redirect";

interface IProps {
	sm?: boolean;
	onToLoginClick: () => void;
}
export default function Register({ sm = false, onToLoginClick }: IProps) {
	const dispatch = useAppDispatch();
	const { fetchAsync } = useApi();

	async function handleRegisterAsync(request: IRegisterRequest) {
		dispatch(setIsLoading(true));
		await fetchAsync({
			request: async () => await apiAuth.registerAsync(request),
			onSuccess: (handler) => handler.do(() => redirect("/account")),
			onError: (handler) => handler.log().popup(),
		});
		dispatch(setIsLoading(false));
	}

	return (
		<Template sm={sm} avatar={<LockOutlined />} title="Регистрация">
			<RegisterForm onSubmitAsync={handleRegisterAsync} />
			<Typography sx={{ cursor: "pointer" }} variant="body2">
				Уже есть аккант?
				<Link onClick={onToLoginClick} marginLeft={1}>
					Войти
				</Link>
			</Typography>
		</Template>
	);
}
