import { ReactElement, useEffect, useState } from "react";
import { getCurrentAsync } from "../store/user.slice";
import { useAppDispatch } from "./hooks/redux/use-app-dispatch";
import { CircularProgress } from "@mui/material";
import { ApiResponse } from "../api/api";
import { IUser } from "../api/interfaces/user/user.interface";
import getConstant from "../infrastructure/constantProvider";

export default function Identity({
	children,
}: {
	children: ReactElement;
}): ReactElement {
	const imagesPath = getConstant("IMAGES_PATH");
	const dispatch = useAppDispatch();
	const [serverIsDead, setServerIsDead] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		dispatch(getCurrentAsync()).then((result) => {
			setIsLoading(false);
			const payload = result.payload as ApiResponse<IUser | null>;
			if (payload.ok) return;
			if (payload.status === 500) setServerIsDead(true);
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
	if (serverIsDead)
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
				<div style={{ display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center" }}>
					<h1>{"Сайт не доступен :("}</h1>
					<img
						src={imagesPath + "/server-is-dead.png"}
						alt="logo"
						style={{
							margin: "auto",
							objectFit: "contain",
							maxHeight: "20%",
							maxWidth: "20%",
						}}
					/>
				</div>
			</div>
		);

	return children;
}
