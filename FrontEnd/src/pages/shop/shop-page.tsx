import { ReactNode } from "react";
import Page from "../../components/page";
import { Box, BoxProps, Typography } from "@mui/material";

export default function ShopPage({
	children,
	mainBoxProps,
	sideBoxProps,
}: {
	sideBoxProps?: BoxProps;
	mainBoxProps?: BoxProps;
	children: ReactNode;
}) {
	return (
		<Page sx={{ mt: 2 }}>
			<Box display={"flex"} gap={2}>
				<Box
					{...sideBoxProps}
					sx={{
						bgcolor: "white",
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
