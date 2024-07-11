import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";
import { IAvatar } from "./nav-avatar";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import useApi from "../../api/hooks/use-api.hook";
import { setIsPageLoading } from "../../store/page.slice";
import apiAuth from "../../api/endpoints/auth.api";
import { resetCurrentUserState } from "../../store/user.slice";

export interface INavBar {
	sm?: boolean;
}
export default function NavBar({ sm = false }: INavBar) {
	const navigate = useNavigate();
	const tabs = useAppSelector((state) => state.page.tabs);
	const { fetchAsync } = useApi({ triggerPage: true });
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	const selectedItemIndex = useMemo<number | null>(() => {
		const index = tabs.findIndex((tab) => tab.active);
		if (index > -1) return index;
		else return null;
	}, [tabs]);

	const menuAvatar = useMemo<IAvatar>(
		() => ({
			menuItems: isAuthenticated
				? [
						{
							icon: "person",
							label: "Личный кабинет",
							sx: { color: "primary.dark", marginRight: 1 },
							onClick: () => navigate("/account"),
						},
						{
							icon: "logout",
							label: "Выйти",
							sx: { color: "primary.dark", marginRight: 1 },
							onClick: handleLogout,
						},
				  ]
				: [
						{
							icon: "login",
							label: "Войти",
							sx: { color: "primary.dark", marginRight: 1 },
							onClick: () => navigate("/auth"),
						},
				  ],
			tip: "Аккаунт",
			sx: { bgcolor: "primary.main" },
		}),
		[isAuthenticated]
	);
	async function handleLogout() {
		dispatch(setIsPageLoading(true));
		await fetchAsync({
			request: async () => await apiAuth.logoutAsync(),
			onSuccess: (handler) =>
				handler.do(() => {
					navigate("/auth");
					dispatch(resetCurrentUserState());
				}),
			onError: (handler) => handler.log().popup(),
		});
		dispatch(setIsPageLoading(false));
	}

	return (
		<>
			{sm ? (
				<NavTopBar
					value={selectedItemIndex}
					menuItems={tabs}
					avatar={menuAvatar}
				/>
			) : (
				<NavSideBar
					value={selectedItemIndex}
					avatar={menuAvatar}
					menuItems={tabs}
				/>
			)}
		</>
	);
}
