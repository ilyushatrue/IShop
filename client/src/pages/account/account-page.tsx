import { Box, BoxProps } from "@mui/material";
import Page from "../../components/page";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { setShopping } from "../../store/page.slice";

export default function AccountPage({ children, ...props }: BoxProps) {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const { screenSize } = useMediaQueryContext();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(setShopping(false));
	}, [dispatch]);
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
