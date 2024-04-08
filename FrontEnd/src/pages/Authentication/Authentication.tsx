import { useState } from "react";
import Login from "./Login";
import Register from "./Register/Register";
import { Box, Typography } from "@mui/material";

interface IProps {
	isRegistered?: boolean;
	sm?: boolean;
}
export default function Authentication({
	isRegistered = true,
	sm = false,
}: IProps) {
	const [hasAccess, setHasAccess] = useState(false);

	return (
		<>
			{!hasAccess ? (
				<Box>
					{isRegistered ? (
						<Login sm={sm} onLogin={() => setHasAccess(true)} />
					) : (
						<Register
							sm={sm}
							onRegister={() => setHasAccess(true)}
						/>
					)}
				</Box>
			):(
				<Typography variant="h1">
					ЗАШЕЛ ЕБАТЬ
				</Typography>
			)}
		</>
	);
}
