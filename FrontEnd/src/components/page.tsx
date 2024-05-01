import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IPage {
	isLoading?: boolean;
	children: ReactNode;
	sx?: SxProps;
}

export default function Page({ isLoading = false, children, sx }: IPage) {
	const navigate = useNavigate();

	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			style={{ marginTop: "78px" }}
			sx={sx}
		>
			<Box maxWidth={1280}>{children}</Box>
		</Box>
	);
}
