import React from "react";
import NavTabs from "./tabs/nav-tabs";
import { Avatar, Box } from "@mui/material";

interface IProps {
	menuItems: { label: string; href: string }[];
	onTabChange: (tabIndex: number) => void;
}
export default function NavTopBar({ menuItems, onTabChange }: IProps) {
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
			<Avatar
				sx={{
					marginLeft: "auto",
					marginRight: 2,
					backgroundColor: "primary.main",
					cursor: "pointer",
				}}
			>
				A
			</Avatar>
		</Box>
	);
}
