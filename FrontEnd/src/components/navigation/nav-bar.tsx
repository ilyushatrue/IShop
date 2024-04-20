import React from "react";

import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";
import { IAvatar } from "./nav-avatar";

const menuAvatar: IAvatar = {
	menuItems: [
		{ icon: "edit", label: "Выйти", sx: { color: "primary.dark" } },
		{ icon: "menu", label: "Выйти", sx: { color: "primary.dark" } },
		{ icon: "subject", label: "Выйти", sx: { color: "primary.dark" } },
	],
	tip: "Аккаунт",
	sx: { bgcolor: "primary.main" },
};

const menuItems = [
	{ label: "Главная", href: "/page1" },
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
