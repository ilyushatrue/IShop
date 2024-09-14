import { Box, BoxProps } from "@mui/material";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export default function ShopPageMainBox({ sx, ...props }: BoxProps) {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const { screenSize, xs } = useMediaQueryContext();

	return (
		<Box
			{...props}
			sx={{
				position: "relative",
				bgcolor: "white",
				boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
				borderRadius: "24px",
				padding: 2,
				minHeight: `calc(100vh - ${navbarHeight[screenSize] + 50}px)`,
				width: xs ? "100%" : 1200,
				...sx,
			}}
		/>
	);
}
