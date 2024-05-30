import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";
import { IAvatar } from "./nav-avatar";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../../api/hooks/use-api.hook";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { logoutAsync } from "../../store/user.slice";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

const menuItems = [
	{ label: "Главная", href: "/" },
	{ label: "Дополнительная", href: "/page2" },
	{ label: "Пользователи", href: "/users" },
	{ label: "Тест", href: "/test" },
];

export interface INavBar {
	sm?: boolean;
}
export default function NavBar({ sm = false }: INavBar) {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector((state) => state.user);
	const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
		null
	);
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
		const result = await dispatch(logoutAsync());
		window.location.reload();
		return true;
	}

	const navigationMaps = useMemo(() => {
		const map: any = {};
		menuItems.forEach((tab, index) => {
			map[tab.href] = index;
			map[index] = tab.href;
		});
		return map;
	}, []);

	function handleItemSelect(tabIndex: number) {
		navigate(navigationMaps[tabIndex as keyof typeof navigationMaps]);
	}

	useEffect(() => {
		Object.keys(navigationMaps).forEach((k) => {
			if (location.pathname.includes(k)) {
				setSelectedItemIndex(
					navigationMaps[k as keyof typeof navigationMaps]
				);
			}
		});
	}, [location.pathname, navigationMaps]);

	return (
		<>
			{sm ? (
				<NavTopBar
					value={selectedItemIndex}
					menuItems={menuItems}
					avatar={menuAvatar}
					onTabChange={handleItemSelect}
				/>
			) : (
				<NavSideBar
					value={selectedItemIndex}
					avatar={menuAvatar}
					menuItems={menuItems}
					onTabChange={handleItemSelect}
				/>
			)}
		</>
	);
}
