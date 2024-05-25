import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Register from "./register/register";
import Login from "./login";
import Page from "../../components/page";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface IProps {
	sm?: boolean;
}
export default function Authentication({ sm = false }: IProps) {
	const [hasAccess, setHasAccess] = useState(false);
	const [hasAccount, setHasAccount] = useState(true);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch;

	console.log(hasAccount);

	return (
		<Page isLoading={false}>
			<>
				{user.user?.firstName ?? ""} +{" "}
				{user.isAuthenticated ? "true" : "false"}
			</>
			{!hasAccess ? (
				<Box>
					{hasAccount ? (
						<Login
							sm={sm}
							onLogin={() => setHasAccess(true)}
							onToRegisterClick={() => setHasAccount(false)}
						/>
					) : (
						<Register
							sm={sm}
							onToLoginClick={() => setHasAccount(true)}
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
