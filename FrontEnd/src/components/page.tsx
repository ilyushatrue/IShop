import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";

import { useAppSelector } from "../app/hooks/redux/use-app-selector";

interface IPage {
	isLoading?: boolean;
	children: ReactNode;
	sx?: SxProps;
}

export default function Page({ isLoading = false, children, sx }: IPage) {
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
				<Box
					bgcolor={isAuthenticated ? "green" : "red"}
					height={5}
				></Box>
				{children}
			</Box>
		</Box>
	);
}
