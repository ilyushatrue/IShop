import { ReactElement, useEffect, useState } from "react";
import { getCurrentAsync } from "../store/user.slice";
import { useAppDispatch } from "./hooks/redux/use-app-dispatch";
import { CircularProgress } from "@mui/material";

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
		return (
			<div
				style={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularProgress size={60} />
			</div>
		);
	}
	return children;
}
