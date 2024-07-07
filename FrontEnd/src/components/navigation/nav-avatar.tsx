import { IconButton, Menu, MenuItem, SxProps, Tooltip } from "@mui/material";
import { useState } from "react";
import Icon, { IIcon } from "../icon";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import Avatar from "../avatar";

export interface IAvatar {
	sx?: SxProps;
	containerSx?: SxProps;
	tip: string;
	menuItems: {
		label: string;
		icon: IIcon["name"];
		sx: SxProps;
		onClick: () => void;
	}[];
}
export default function NavAvatar({ tip, menuItems }: IAvatar) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);
	const { user } = useAppSelector((state) => state.user);
	function closeMenu() {
		setAnchorEl(null);
	}
	function handleMenuClick() {
		setAnchorEl(null);
	}
	const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<>
			<Tooltip title={tip}>
				<IconButton onClick={handleAvatarClick} size="small">
					<Avatar imageId={user?.avatarId} />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={isMenuOpen}
				onClose={closeMenu}
				onClick={handleMenuClick}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&::before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{menuItems.map((item, index) => (
					<MenuItem
						onClick={() => {
							closeMenu();
							item.onClick();
							return;
						}}
						key={index}
					>
						<Icon name={item.icon} sx={item.sx} />
						{item.label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
