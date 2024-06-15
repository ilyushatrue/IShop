import { LinearProgress, SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useEffect } from "react";

import { useAppDispatch } from "../app/hooks/redux/use-app-dispatch";
import { setActiveTab } from "../store/page.slice";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks/redux/use-app-selector";

export interface IPage {
	isLoading?: boolean;
	children?: ReactNode;
	sx?: SxProps;
	tabName?: string;
}

export default function Page({ isLoading = false, children, sx }: IPage) {
	const dispatch = useAppDispatch();
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const { pathname } = useLocation();

	useEffect(() => {
		dispatch(setActiveTab(pathname));
	}, [dispatch, pathname]);

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			style={{ marginTop: navbarHeight }}
		>
			{isLoading && (
				<Box width={"100%"}>
					<LinearProgress />
				</Box>
			)}
			<Box maxWidth={1280} width={"100%"} sx={sx}>
				{children}
			</Box>
		</Box>
	);
}
