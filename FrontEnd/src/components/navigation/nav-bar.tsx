import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";
import { IAvatar } from "./nav-avatar";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuAvatar: IAvatar = {
	menuItems: [
		{
			icon: "logout",
			label: "Выйти",
			sx: { color: "primary.dark", marginRight: 1 },
		},
	],
	tip: "Аккаунт",
	sx: { bgcolor: "primary.main" },
};

const menuItems = [
	{ label: "Главная", href: "/shop" },
	{ label: "Дополнительная", href: "/page2" },
	{ label: "Пользователи", href: "/users" },
];

export interface INavBar {
	sm?: boolean;
}
export default function NavBar({ sm = false }: INavBar) {
	const location = useLocation();
	const navigate = useNavigate();
	const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

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
			console.log(k, location.pathname)
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
