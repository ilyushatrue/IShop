import Register from "./Register/Register";
import Login from "./Login/Login";
import { Box } from "@mui/material";

interface IProps {
	isRegistered?: boolean;
	sm?: boolean;
}
export default function Authentication({
	isRegistered = false,
	sm = false,
}: IProps) {
	return <Box>{isRegistered ? <Login /> : <Register />}</Box>;
}
