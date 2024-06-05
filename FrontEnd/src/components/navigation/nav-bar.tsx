import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";
import { IAvatar } from "./nav-avatar";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { logoutAsync } from "../../store/user.slice";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

export interface INavBar {
	sm?: boolean;
}
export default function NavBar({ sm = false }: INavBar) {
	const navigate = useNavigate();
	const tabs = useAppSelector((state) => state.page.tabs);
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector((state) => state.user);

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
		[]
	);

	async function handleLogout(): Promise<boolean | undefined> {
		await dispatch(logoutAsync());
		navigate('/auth')
		window.location.reload();
		return true;
	}

	function handleTabChange(index: number) {
		navigate(tabs[index].href);
	}

	return (
		<>
			{sm ? (
				<NavTopBar
					value={selectedItemIndex}
					menuItems={tabs}
					avatar={menuAvatar}
					onTabChange={handleTabChange}
				/>
			) : (
				<NavSideBar
					value={selectedItemIndex}
					avatar={menuAvatar}
					menuItems={tabs}
					onTabChange={handleTabChange}
				/>
			)}
		</>
	);
}
