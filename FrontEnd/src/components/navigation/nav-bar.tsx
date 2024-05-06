import NavSideBar from "./nav-side-bar";
import NavTopBar from "./nav-top-bar";
import { IAvatar } from "./nav-avatar";
import { useMemo } from "react";
import api, { redirect } from "../../api/apiAccessor";


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

	const menuAvatar = useMemo<IAvatar>(()=> ({
		menuItems: [
			{
				icon: "logout",
				label: "Выйти",
				sx: { color: "primary.dark", marginRight: 1 },
				onClick: handleLogout
			},
		],
		tip: "Аккаунт",
		sx: { bgcolor: "primary.main" },
	}), []);

	async function handleLogout(): Promise<boolean | undefined>{
		const result = await api.tryPostAsync<undefined, boolean>("auth/logout")
		if(result){
			redirect("/login")
		}
		return result;
	}

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
