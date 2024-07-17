import NavTabs from "./tabs/nav-tabs";
import { Box, Icon } from "@mui/material";
import NavAvatar, { IAvatar } from "./nav-avatar";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import IconButton from "../buttons/icon-button";

interface IProps {
	menuItems: {
		label: string;
		href: string;
	}[];
	avatar: IAvatar;
	value: number | null;
}
export default function NavTopBar({ menuItems, avatar, value }: IProps) {
	const { navbar, displayWidth } = useAppSelector((state) => state.page);
	const navigate = useNavigate();

	return (
		<Box
			position={"fixed"}
			top={0}
			left={0}
			right={0}
			zIndex={1}
			display={"flex"}
			alignItems={"start"}
			justifyContent={"center"}
			height={navbar.height}
			bgcolor={"white"}
			boxShadow={"0px 0px 120px rgba(0,0,0,0.1)"}
		>
			<Box width={displayWidth} display={"flex"} flexDirection={"column"}>
				<Box height={"60px"} width={"100%"}>
					<Box
						display={"flex"}
						justifyContent={"end"}
						gap={2}
						marginY={0.5}
						alignItems={"center"}
					>
						<Box
							display={"flex"}
							justifyContent={"end"}
							alignItems={"center"}
							height={40}
							bgcolor={"whitesmoke"}
							borderRadius={"24px"}
							width={600}
						>
							<Icon sx={{ mr: 2 }}>search</Icon>
						</Box>
						<IconButton
							orientation="vertical"
							caption="Заказы"
							iconName="local_shipping"
							iconSx={{ color: "black" }}
							onClick={() => navigate("/purchases")}
						/>
						<IconButton
							orientation="vertical"
							caption="Избранное"
							iconName="favorite"
							iconSx={{ color: "black" }}
							onClick={() => navigate("/favorites")}
						/>
						<IconButton
							orientation="vertical"
							caption="Корзина"
							iconName="shopping_bag"
							iconSx={{ color: "black" }}
							onClick={() => navigate("/cart")}
						/>
						<Box display={"flex"} alignItems={"center"}>
							{avatar && (
								<NavAvatar
									tip={avatar.tip}
									sx={avatar.sx}
									menuItems={avatar.menuItems}
								/>
							)}
						</Box>
					</Box>
				</Box>
				<Box height={"60px"}>
					<NavTabs
						value={value}
						menuItems={menuItems}
						orientation={"horizontal"}
					/>
				</Box>
			</Box>
		</Box>
	);
}
