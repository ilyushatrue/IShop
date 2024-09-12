import { Box, BoxProps } from "@mui/material";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export default function ShopPageSideBox({ sx, ...props }: BoxProps) {
	const { xs } = useMediaQueryContext();
	return (
		<Box
			{...props}
			sx={{
				bgcolor: "white",
				boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
				borderRadius: "24px",
				padding: 2,
				flex: 1,
				...sx,
			}}
		/>
	);
}
