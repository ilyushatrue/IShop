import { ReactNode } from "react";
import Page from "../../components/page";
import { Box, BoxProps, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export default function ShopPage({
	children,
	mainBoxProps,
	sideBoxProps,
}: {
	sideBoxProps?: BoxProps;
	mainBoxProps?: BoxProps;
	children: ReactNode;
}) {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const { screenSize, xs } = useMediaQueryContext();

	return (
		<Page sx={{ mt: 2 }}>
			<Box display={"flex"} gap={2} flexDirection={xs ? "column" : "row"}>
				<Box
					{...sideBoxProps}
					sx={{
						bgcolor: "white",
						boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
						borderRadius: "24px",
						padding: 2,
						width: xs ? "100%" : 200,
					}}
				>
					<Typography>Цена </Typography>
					<Typography>от: </Typography>
					<Typography>до: </Typography>
				</Box>
				<Box
					{...mainBoxProps}
					minHeight={`calc(100vh - ${
						navbarHeight[screenSize] + 50
					}px)`}
					sx={{
						bgcolor: "white",
						boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
						borderRadius: "24px",
						padding: 2,
						width: xs ? "100%" : 1200,
					}}
				>
					{children}
				</Box>
			</Box>
		</Page>
	);
}
