import { Box, BoxProps } from "@mui/material";

export default function AccountPageMainBox({ children, ...props }: BoxProps) {
	return (
		<Box
			{...props}
			bgcolor={"white"}
			flex={1}
			borderRadius={4}
			boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
			overflow={"hidden"}
		>
			{children}
		</Box>
	);
}
