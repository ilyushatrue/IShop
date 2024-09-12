import { ReactElement, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./hooks/redux/use-app-dispatch";
import { CircularProgress } from "@mui/material";
import getConstant from "./infrastructure/constant-provider";
import usersApi from "../api/endpoints/users.api";
import {
	resetCurrentUserState,
	updateCurrentUserState,
} from "../store/user.slice";
import { setInitialAppState } from "../store/global.slice";
import { IProductCategory } from "../api/interfaces/product-categories/product-category.interface";

export default function Identity({
	children,
}: {
	children: ReactElement;
}): ReactElement {
	const imagesPath = getConstant("IMAGES_PATH");
	const dispatch = useAppDispatch();
	const [serverIsDead, setServerIsDead] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const setCategoryParentNull = useCallback((parent: IProductCategory) => {
		parent.children?.map((child) => {
			child.parent = null;
			setCategoryParentNull(child);
			return child;
		});
		return parent;
	}, []);

	useEffect(() => {
		usersApi
			.getCurrentAsync()
			.then((res) => {
				console.log(1234);
				if (res.ok) {
					const { productCategories, user, menuItems } = res.body!;
					if (user) {
						const {
							avatarId,
							email,
							firstName,
							lastName,
							phone,
							favoriteProducts,
						} = user!;
						dispatch(
							updateCurrentUserState({
								isAuthenticated: true,
								avatarId: avatarId,
								email: email,
								firstName: firstName,
								favoriteProducts: favoriteProducts,
								lastName: lastName,
								phone: phone,
							})
						);
					}

					dispatch(
						setInitialAppState({
							menuItems: menuItems.sort(
								(a, b) => a.order - b.order
							),
							productCategories: productCategories.map((pc) =>
								setCategoryParentNull(pc)
							),
						})
					);
				} else {
					dispatch(resetCurrentUserState());
				}
			})
			.catch(() => setServerIsDead(true))
			.finally(() => setIsLoading(false));
	}, [dispatch, setCategoryParentNull]);

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
				<CircularProgress size={60} sx={{ color: "primary.300" }} />
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
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
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
