import React from "react";
import NavTabs from "./tabs/nav-tabs";
import { Avatar, Box } from "@mui/material";
import NavAvatar, { IAvatar } from "./nav-avatar";
import { INavBar } from "./nav-bar";

interface IProps {
	menuItems: { label: string; href: string }[];
	onTabChange: (tabIndex: number) => void;
	avatar: IAvatar;
}
export default function NavTopBar({ menuItems, onTabChange, avatar }: IProps) {
	return (
		<Box
			display={"flex"}
			alignItems={"center"}
			height={54}
			bgcolor={"white"}
			boxShadow={"0px 0px 120px rgba(0,0,0,0.1)"}
		>
			<NavTabs
				onChange={onTabChange}
				menuItems={menuItems}
				orientation={"horizontal"}
			/>
			{avatar && (
				<NavAvatar
					tip={avatar.tip}
					sx={avatar.sx}
					menuItems={avatar.menuItems}
					containerSx={{
						marginLeft: "auto",
						marginRight: 2,
					}}
				/>
			)}
		</Box>
	);
}
