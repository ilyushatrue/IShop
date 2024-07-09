import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "./hooks/redux/use-app-dispatch";
import { CircularProgress } from "@mui/material";
import getConstant from "./infrastructure/constant-provider";
import usersApi from "../api/users.api";
import {
	resetCurrentUserState,
	updateCurrentUserState,
} from "../store/user.slice";
import { setInitialAppState } from "../store/global.slice";
import { initApi } from "../api/init.api";

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
		const initialDataPromise = initApi.getInitialData().then((res) => {
			if (res.ok) {
				dispatch(setInitialAppState(res.body!));
			}
		});

		const userDataPromise = usersApi.getCurrentAsync().then((res) => {
			if (res.ok) {
				const { avatarId, email, firstName, lastName, phone } =
					res.body!;
				dispatch(
					updateCurrentUserState({
						isAuthenticated: true,
						avatarId: avatarId,
						email: email,
						firstName: firstName,
						lastName: lastName,
						phone: phone,
					})
				);
			} else {
				dispatch(resetCurrentUserState());
			}
		});
		Promise.all([initialDataPromise, userDataPromise]).finally(() =>
			setIsLoading(false)
		);
	}, []);

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
	// if (serverIsDead)
	// 	return (
	// 		<div
	// 			style={{
	// 				position: "absolute",
	// 				top: 0,
	// 				bottom: 0,
	// 				left: 0,
	// 				right: 0,
	// 				display: "flex",
	// 				justifyContent: "center",
	// 				alignItems: "center",
	// 			}}
	// 		>
	// 			<div style={{ display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center" }}>
	// 				<h1>{"Сайт не доступен :("}</h1>
	// 				<img
	// 					src={imagesPath + "/server-is-dead.png"}
	// 					alt="logo"
	// 					style={{
	// 						margin: "auto",
	// 						objectFit: "contain",
	// 						maxHeight: "20%",
	// 						maxWidth: "20%",
	// 					}}
	// 				/>
	// 			</div>
	// 		</div>
	// 	);

	return children;
}
