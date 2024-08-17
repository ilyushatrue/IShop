import { useState } from "react";
import { ArrowBack, Menu } from "@mui/icons-material";
import { Box, Button, Collapse, SxProps } from "@mui/material";
import NavTabs from "./tabs/nav-tabs";
import NavAvatar, { IAvatar } from "./nav-avatar";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

const collapseSx: SxProps = {
	position: "fixed",
	top: 0,
	bgcolor: "white",
	zIndex: 2,
};

interface IProps {
	menuItems: {
		label: string;
		href: string;
	}[];
	avatar: IAvatar;
	value: number | null;
}
export default function NavSideBar({ menuItems, avatar, value }: IProps) {
	const { height } = useAppSelector((state) => state.page.navbar);
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);

	function toggleMenuCollapse() {
		setIsMenuCollapsed((prev) => !prev);
	}

	function handleTabChange(tabIndex: number) {
		toggleMenuCollapse();
	}

	return (
		<>
			<Box
				position={"fixed"}
				top={0}
				left={0}
				right={0}
				sx={{"&:hover":{
					cursor:"pointer"
				}}}
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={"center"}
				height={height.xs}
				bgcolor={"white"}
				boxShadow={"0px 0px 120px rgba(0,0,0,0.1)"}
			>
				<Button sx={{ height: height }} onClick={toggleMenuCollapse}>
					<Menu />
				</Button>
				{avatar && (
					<NavAvatar
						menuItems={avatar.menuItems}
						tip={avatar.tip}
						containerSx={{
							marginLeft: "auto",
							marginRight: 2,
						}}
						sx={avatar.sx}
					/>
				)}
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
						sx={{ height: height, marginLeft: "auto" }}
						onClick={toggleMenuCollapse}
					>
						<ArrowBack />
					</Button>
					<NavTabs
						value={value}
						onChange={handleTabChange}
						menuItems={menuItems}
						orientation={"vertical"}
					/>
				</Box>
			</Collapse>
		</>
	);
}
