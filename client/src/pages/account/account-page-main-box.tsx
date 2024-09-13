import { Box, BoxProps } from "@mui/material";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export default function AccountPageMainBox({
	children,
	sx,
	...props
}: BoxProps) {
	const { xs } = useMediaQueryContext();
	return (
		<Box
			{...props}
			sx={{
				...sx,
				bgcolor: "white",
				borderRadius: 4,
				boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
				overflow: "hidden",
				width: xs ? "100%" : 1200,
			}}
		>
			{children}
		</Box>
	);
}
