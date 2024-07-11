import { Box, BoxProps, LinearProgress } from "@mui/material";

import { useAppDispatch } from "../app/hooks/redux/use-app-dispatch";
import { setActiveTab } from "../store/page.slice";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks/redux/use-app-selector";
import { useEffect } from "react";

export default function Page({ children, ...props }: BoxProps) {
	const dispatch = useAppDispatch();
	const { displayWidth, loading, navbar } = useAppSelector(
		(state) => state.page
	);
	const { pathname } = useLocation();

	useEffect(() => {
		dispatch(setActiveTab(pathname));
	}, [dispatch, pathname]);

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			style={{ marginTop: navbar.height }}
		>
			{loading && (
				<LinearProgress
					sx={{
						position: "fixed",
						top: navbar.height,
						width: "100%",
					}}
				/>
			)}
			<Box {...props} maxWidth={displayWidth} width={"100%"}>
				{children}
			</Box>
		</Box>
	);
}
