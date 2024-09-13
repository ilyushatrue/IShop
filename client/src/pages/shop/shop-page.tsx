import Page from "../../components/page";
import { BoxProps } from "@mui/material";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { setShopping } from "../../store/page.slice";
import { setSearchValue } from "../../store/global.slice";

export default function ShopPage({ sx, ...props }: BoxProps) {
	const { xs } = useMediaQueryContext();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(setShopping(true));
		dispatch(setSearchValue(""));
	}, [dispatch]);
	return (
		<Page
			{...props}
			sx={{
				display: "flex",
				gap: 2,
				flexDirection: xs ? "column" : "row",
				mt: 2,
				...sx,
			}}
		/>
	);
}
