import { Box, BoxProps } from "@mui/material";
import Page from "../../components/page";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export default function AccountPage({ children, ...props }: BoxProps) {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const { screenSize } = useMediaQueryContext();
	return (
		<Page {...props}>
			<Box
				display={"flex"}
				my={2}
				gap={2}
				minHeight={`calc(100vh - ${navbarHeight[screenSize] + 50}px)`}
			>
				{children}
			</Box>
		</Page>
	);
}
