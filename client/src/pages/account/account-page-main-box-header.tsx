import { Box, BoxProps } from "@mui/material";

export default function AccountPageMainBoxHeader({
	children,
	...props
}: BoxProps) {
	return (
		<Box
			{...props}
			height={50}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			margin={0}
			padding={0}
			color={"white"}
			bgcolor={"primary.700"}
		>
			{children}
		</Box>
	);
}
