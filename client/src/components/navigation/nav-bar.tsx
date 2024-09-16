import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";
import { IAvatar } from "./nav-avatar";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import useApi from "../../api/hooks/use-api.hook";
import AuthApi from "../../api/endpoints/auth.api";
import { resetCurrentUserState } from "../../store/user.slice";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export default function NavBar() {
	const navigate = useNavigate();
	const navigateTo = useCallback(
		(path: string) => () => {
			navigate(path);
		},
		[navigate]
	);
	const { xs } = useMediaQueryContext();
	const tabs = useAppSelector((state) => state.page.tabs);
	const menuItems = useAppSelector((state) => state.global.menuItems);
	const { fetchAsync } = useApi();
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	const selectedItemIndex = useMemo<number | null>(() => {
		const index = tabs.findIndex((tab) => tab.active);
		if (index > -1) return index;
		else return null;
	}, [tabs]);

	const handleLogout = useCallback(() => {
		fetchAsync({
			request: AuthApi.logoutAsync(),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then(() => {
				navigate("/auth");
				dispatch(resetCurrentUserState());
			})
			.catch(() => {});
	}, [dispatch, fetchAsync, navigate]);

	const menuAvatar = useMemo<IAvatar>(() => {
		let authItems = menuItems
			.map((mi) => ({
				icon: mi.iconName,
				label: mi.title,
				onClick: navigateTo(mi.url),
			}))
			.concat([
				{
					icon: "logout",
					label: "Выйти",
					onClick: handleLogout,
				},
			]);

		let visitorItems: IAvatar["menuItems"] = [
			{
				icon: "login",
				label: "Войти",
				onClick: navigateTo("/auth"),
			},
		];
		if (xs) {
			visitorItems = visitorItems.concat([
				{
					icon: "favorite",
					label: "Избранное",
					onClick: navigateTo("/my/favorites"),
				},
				{
					icon: "shopping_cart",
					label: "Корзина",
					onClick: navigateTo("/my/cart"),
				},
			]);
		}

		return {
			menuItems: isAuthenticated ? authItems : visitorItems,
			tip: "Аккаунт",
			sx: { bgcolor: "primary.main" },
		};
	}, [handleLogout, isAuthenticated, menuItems, navigateTo, xs]);

	function handleTabChange(href: string) {
		setTimeout(navigateTo(href), 150);
	}

	return xs ? (
		<NavSideBar
			onChange={handleTabChange}
			value={selectedItemIndex}
			avatar={menuAvatar}
			menuItems={tabs}
		/>
	) : (
		<NavTopBar
			onChange={handleTabChange}
			value={selectedItemIndex}
			menuItems={tabs}
			avatar={menuAvatar}
		/>
	);
}
