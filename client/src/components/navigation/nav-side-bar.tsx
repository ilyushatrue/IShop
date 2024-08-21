import { useState } from "react";
import { Menu } from "@mui/icons-material";
import { Box, Button, Drawer } from "@mui/material";
import NavTabs from "./tabs/nav-tabs";
import NavAvatar, { IAvatar } from "./nav-avatar";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

interface IProps {
	menuItems: {
		label: string;
		iconName: string;
		href: string;
	}[];
	avatar: IAvatar;
	value: number | null;
	onChange: (href: string) => void;
}
export default function NavSideBar({
	menuItems,
	avatar,
	value,
	onChange,
}: IProps) {
	const { height } = useAppSelector((state) => state.page.navbar);
	const { xs } = useMediaQueryContext();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setIsMenuOpen(open);
		};
	function toggleMenuCollapse() {
		setIsMenuOpen((prev) => !prev);
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
				sx={{
					"&:hover": {
						cursor: "pointer",
					},
				}}
				display={"flex"}
				zIndex={1}
				justifyContent={"space-between"}
				alignItems={"center"}
				height={height.xs}
				bgcolor={"white"}
				boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
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
			<Drawer
				open={isMenuOpen}
				onClose={toggleDrawer(false)}
				PaperProps={{ sx: { minWidth: 220 } }}
			>
				<br />
				<NavTabs
					value={value}
					onChange={(e, tabIndex, href) => {
						e.stopPropagation();
						handleTabChange(tabIndex);
						onChange(href);
					}}
					menuItems={menuItems}
					orientation={"vertical"}
				/>
			</Drawer>
		</>
	);
}
