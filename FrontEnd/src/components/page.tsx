import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";

import { useAppSelector } from "../app/hooks/redux/use-app-selector";
import { useAppDispatch } from "../app/hooks/redux/use-app-dispatch";
import pageSlice, { setActiveTab } from "../store/page.slice";
interface IPage {
	isLoading?: boolean;
	children: ReactNode;
	sx?: SxProps;
}

export default function Page({ isLoading = false, children, sx }: IPage) {
	const dispatch = useAppDispatch();
	const tab = "/users";
	dispatch(setActiveTab({ activeTab: tab }));
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
