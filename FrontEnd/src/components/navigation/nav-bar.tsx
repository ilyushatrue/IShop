import React from "react";

import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";
import { IAvatar } from "./nav-avatar";

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
	{ label: "Личный кабинет", href: "/account" },
	{ label: "Пользователи", href: "/users" },
];

export interface INavBar {
	sm?: boolean;
}
export default function NavBar({ sm = false }: INavBar) {
	function handleTabChange(tabIndex: number) {}

	return (
		<>
			{sm ? (
				<NavTopBar
					menuItems={menuItems}
					avatar={menuAvatar}
					onTabChange={handleTabChange}
				/>
			) : (
				<NavSideBar
					avatar={menuAvatar}
					menuItems={menuItems}
					onTabChange={handleTabChange}
				/>
			)}
		</>
	);
}
