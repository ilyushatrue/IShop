import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Drawer, Icon, TextField } from "@mui/material";
import NavTabs from "./tabs/nav-tabs";
import NavAvatar, { IAvatar } from "./nav-avatar";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

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
	const shopping = useAppSelector((state) => state.page.shopping);
	const searchValue = useAppSelector((state) => state.global.searchValue);
	const [showSearch, setShowSearch] = useState(shopping);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchText, setSearchText] = useState(searchValue);
	useEffect(() => {
		console.log("searchValue", searchValue);
		setSearchText(searchValue);
		setShowSearch(shopping);
	}, [shopping, searchValue, value]);

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

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

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
				zIndex={100}
				justifyContent={"space-between"}
				alignItems={"center"}
				height={height.xs}
				bgcolor={"white"}
				boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
			>
				<Button
					sx={{ height: height, minWidth: 50 }}
					size="small"
					onClick={toggleMenuCollapse}
				>
					<Icon sx={{ color: "black", marginX: "auto" }}>menu</Icon>
				</Button>
				{showSearch && (
					<TextField
						onChange={handleSearchInputChange}
						placeholder="телефон iphone"
						value={searchText}
						sx={{
							padding: 0,
							width: "100%",
							marginRight: 1,
						}}
						inputProps={{
							sx: { paddingY: 1, paddingX: 2 },
						}}
						InputProps={{
							sx: {
								userSelect: "none",
								fontSize: 14,
								borderRadius: "12px",
								bgcolor: "rgb(253,253,253)",
							},
							endAdornment: <Icon fontSize="small">search</Icon>,
						}}
					/>
				)}
				{avatar && (
					<NavAvatar
						menuItems={avatar.menuItems}
						tip={avatar.tip}
						containerSx={{
							marginRight: 1,
						}}
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
