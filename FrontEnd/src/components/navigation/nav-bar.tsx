import React from "react";

import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";

const menuItems = [
	{ label: "Главная", href: "/page1" },
	{ label: "Дополнительная", href: "/page2" },
	{ label: "Личный кабинет", href: "/account" },
];

interface IProps {
	sm?: boolean;
}
export default function NavBar({ sm = false }: IProps) {
	function handleTabChange(tabIndex: number) {

	}

	return (
		<>
			{sm ? (
				<NavTopBar
					menuItems={menuItems}
					onTabChange={handleTabChange}
				/>
			) : (
				<NavSideBar
					menuItems={menuItems}
					onTabChange={handleTabChange}
				/>
			)}
		</>
	);
}
