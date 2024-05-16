import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Register from "./register/register";
import Login from "./login";
import Page from "../../components/page";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface IProps {
	isRegistered?: boolean;
	sm?: boolean;
}
export default function Authentication({
	isRegistered = true,
	sm = false,
}: IProps) {
	const [hasAccess, setHasAccess] = useState(false);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch;

	console.log(user);

	return (
		<Page isLoading={false}>
			<>
				{user.user?.firstName ?? ""} +{" "}
				{user.isAuthenticated ? "true" : "false"}
			</>
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
			) : (
				<Typography variant="h1">ЗАШЕЛ</Typography>
			)}
		</Page>
	);
}
