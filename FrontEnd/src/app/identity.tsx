import { ReactElement, useEffect, useState } from "react";
import { getCurrentAsync } from "../store/user.slice";
import { useAppDispatch } from "./hooks/redux/use-app-dispatch";
import { Box } from "@mui/material";

export default function Identity({
	children,
}: {
	children: ReactElement;
}): ReactElement {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		dispatch(getCurrentAsync()).finally(() => {
			setIsLoading(false);
		});
	}, [dispatch]);

	if (isLoading) {
		return <Box fontSize={200}>isLoading</Box>;
	}
	return children;
}
