import { ReactNode } from "react";
import Page from "../../components/page";
import { Box, BoxProps, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

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
	return (
		<Page sx={{ mt: 2 }}>
			<Box
				display={"flex"}
				gap={2}
				minHeight={`calc(100vh - ${navbarHeight + 50}px)`}
			>
				<Box
					{...sideBoxProps}
					sx={{
						bgcolor: "white",
						boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
						borderRadius: "24px",
						padding: 2,
						width: 200,
					}}
				>
					<Typography>Цена </Typography>
					<Typography>от: </Typography>
					<Typography>до: </Typography>
				</Box>
				<Box
					{...mainBoxProps}
					sx={{
						bgcolor: "white",
						boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
						borderRadius: "24px",
						padding: 2,
						width: 1200,
					}}
				>
					{children}
				</Box>
			</Box>
		</Page>
	);
}
