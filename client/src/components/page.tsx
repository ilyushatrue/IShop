import { Box, BoxProps, LinearProgress } from "@mui/material";

import { useAppDispatch } from "../app/hooks/redux/use-app-dispatch";
import { setActiveTab } from "../store/page.slice";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks/redux/use-app-selector";
import { useEffect } from "react";
import { useMediaQueryContext } from "../app/infrastructure/media-query-context";

export default function Page({ children, ...props }: BoxProps) {
	const dispatch = useAppDispatch();
	const { screenSize } = useMediaQueryContext();
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
			style={{ marginTop: navbar.height[screenSize] }}
		>
			{loading && (
				<LinearProgress
					sx={{
						position: "fixed",
						top: navbar.height,
						width: "100%",
						height: 2,
					}}
				/>
			)}
			<Box {...props} maxWidth={displayWidth} width={"100%"}>
				{children}
			</Box>
		</Box>
	);
}
