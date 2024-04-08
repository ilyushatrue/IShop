import React, { useEffect, useState } from "react";
import NavTabs from "./tabs/NavTabs";
import { Avatar, Box, Button, Collapse, SxProps } from "@mui/material";
import { ArrowBack, Menu } from "@mui/icons-material";

const menuItems = [
	{ label: "Главная", href: "/page1" },
	{ label: "Дополнительная", href: "/page2" },
	{ label: "Личный кабинет", href: "/account" },
];

const collapseSx: SxProps = {
	position: "fixed",
	top: 0,
	bgcolor: "white",
	zIndex: 2,
};

interface IProps {
	sm?: boolean;
}
export default function NavBar({ sm = false }: IProps) {
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(sm ? false : true);

	function toggleMenuCollapse() {
		setIsMenuCollapsed((prev) => !prev);
	}

	function handleTabChange(tabIndex: number) {
		if (!sm) {
			setIsMenuCollapsed(true);
		}
	}

	useEffect(() => {
		if (sm) {
			setIsMenuCollapsed(false);
		} else {
			setIsMenuCollapsed(true);
		}
	}, [sm]);

	return (
		<>
			<Box
				display={"flex"}
				alignItems={"center"}
				height={54}
				bgcolor={"white"}
				boxShadow={"0px 0px 120px rgba(0,0,0,0.1)"}
			>
				{!sm && (
					<Button sx={{ height: 54 }} onClick={toggleMenuCollapse}>
						<Menu />
					</Button>
				)}
				<Avatar
					sx={{
						marginLeft: "auto",
						marginRight: 2,
						backgroundColor: "primary.main",
						zIndex: 3,
						cursor:"pointer"
					}}
				>
					A
				</Avatar>
			</Box>

			<Collapse
				in={!isMenuCollapsed}
				orientation="horizontal"
				sx={
					sm
						? {
								...collapseSx,
								left: 0,
								right: 0,
						  }
						: {
								...collapseSx,
								boxShadow: "0px 0px 120px rgba(0,0,0,0.6)",
								bottom: 0,
						  }
				}
			>
				<Box
					display={"flex"}
					flexDirection={sm ? "row" : "column"}
					justifyContent={sm ? "end" : "start"}
				>
					{!sm && (
						<Button
							sx={{ height: 54, marginLeft: "auto" }}
							onClick={toggleMenuCollapse}
						>
							<ArrowBack />
						</Button>
					)}
					<NavTabs
						onChange={handleTabChange}
						menuItems={menuItems}
						orientation={sm ? "horizontal" : "vertical"}
					/>
				</Box>
			</Collapse>
		</>
	);
}
