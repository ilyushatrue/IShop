import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useEffect } from "react";

import { useAppSelector } from "../app/hooks/redux/use-app-selector";
import { useAppDispatch } from "../app/hooks/redux/use-app-dispatch";
import { setActiveTab } from "../store/page.slice";
import { useLocation } from "react-router-dom";

export interface IPage {
	isLoading?: boolean;
	children?: ReactNode;
	sx?: SxProps;
	tabName?: string;
}

export default function Page({ isLoading = false, children, sx }: IPage) {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

	useEffect(() => {
		dispatch(setActiveTab(pathname));
	}, [dispatch, pathname]);
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			style={{ marginTop: "78px" }}
			sx={sx}
		>
			<Box maxWidth={1280}>
				<Box bgcolor={isAuthenticated ? "green" : "red"} height={5} />
				{children}
			</Box>
		</Box>
	);
}
