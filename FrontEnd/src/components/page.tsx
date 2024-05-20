import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated, selectUser } from "../store/userSlice";

interface IPage {
	isLoading?: boolean;
	children: ReactNode;
	sx?: SxProps;
}

export default function Page({ isLoading = false, children, sx }: IPage) {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [isAuthenticated, navigate]);

	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			style={{ marginTop: "78px" }}
			sx={sx}
		>
			<Box maxWidth={1280}><Box bgcolor={isAuthenticated ? "green" : "red"} height={5}></Box>{children}</Box>
		</Box>
	);
}
