import React, { useState } from "react";
import { ArrowBack, Menu } from "@mui/icons-material";
import { Avatar, Box, Button, Collapse, SxProps } from "@mui/material";
import NavTabs from "./tabs/NavTabs";

const collapseSx: SxProps = {
	position: "fixed",
	top: 0,
	bgcolor: "white",
	zIndex: 2,
};

interface IProps {
	menuItems: { label: string; href: string }[];
	onTabChange: (tabIndex: number) => void;
}
export default function NavSideBar({ menuItems, onTabChange }: IProps) {
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);

	function toggleMenuCollapse() {
		setIsMenuCollapsed((prev) => !prev);
	}

	function handleTabChange(tabIndex: number) {
		toggleMenuCollapse();
		onTabChange(tabIndex);
	}

	return (
		<>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={"center"}
				height={54}
				bgcolor={"white"}
				boxShadow={"0px 0px 120px rgba(0,0,0,0.1)"}
			>
				<Button sx={{ height: 54 }} onClick={toggleMenuCollapse}>
					<Menu />
				</Button>
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
			<Collapse
				in={!isMenuCollapsed}
				orientation="horizontal"
				sx={{
					...collapseSx,
					boxShadow: "0px 0px 120px rgba(0,0,0,0.6)",
					bottom: 0,
				}}
			>
				<Box
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"start"}
				>
					<Button
						sx={{ height: 54, marginLeft: "auto" }}
						onClick={toggleMenuCollapse}
					>
						<ArrowBack />
					</Button>
					<NavTabs
						onChange={handleTabChange}
						menuItems={menuItems}
						orientation={"vertical"}
					/>
				</Box>
			</Collapse>
		</>
	);
}
