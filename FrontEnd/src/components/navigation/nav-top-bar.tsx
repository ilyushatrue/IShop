import NavTabs from "./tabs/nav-tabs";
import { Box, Button, Typography } from "@mui/material";
import NavAvatar, { IAvatar } from "./nav-avatar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import IconButton from "../icon-button";
import Icon2 from "../icon";

interface IProps {
	menuItems: {
		label: string;
		href: string;
	}[];
	avatar: IAvatar;
	value: number | null;
}
export default function NavTopBar({ menuItems, avatar, value }: IProps) {
	const navbarHeight = useAppSelector((state) => state.page.navbar);
	const displayWidth = useAppSelector((state) => state.page.displayWidth);
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	return (
		<Box
			position={"fixed"}
			top={0}
			left={0}
			right={0}
			display={"flex"}
			alignItems={"start"}
			justifyContent={"center"}
			height={navbarHeight}
			bgcolor={"white"}
			boxShadow={"0px 0px 120px rgba(0,0,0,0.1)"}
		>
			<Box width={displayWidth} display={"flex"} flexDirection={"column"}>
				<Box height={"60px"} width={"100%"}>
					<Box
						display={"flex"}
						justifyContent={"end"}
						gap={2}
						alignItems={"center"}
					>
						<IconButton
							orientation="vertical"
							iconName="star"
							iconSx={{ color: "black" }}
							onClick={console.log}
						/>
						<IconButton
							orientation="vertical"
							iconName="star"
							iconSx={{ color: "black" }}
							onClick={console.log}
						/>
						<IconButton
							orientation="vertical"
							iconName="star"
							iconSx={{ color: "black" }}
							onClick={console.log}
						/>
						<Box
							display={"flex"}
							justifyContent={"end"}
							alignItems={"center"}
							height={40}
							bgcolor={"whitesmoke"}
							borderRadius={"24px"}
							width={600}
						>
							<Icon2 name="search" sx={{ mr: 2 }} />
						</Box>
						<IconButton
							orientation="vertical"
							caption="Заказы"
							iconName="local_shipping"
							iconSx={{ color: "black" }}
							onClick={console.log}
						/>
						<IconButton
							orientation="vertical"
							caption="Избранное"
							iconName="favorite_border"
							iconSx={{ color: "black" }}
							onClick={console.log}
						/>
						<IconButton
							orientation="vertical"
							caption="Корзина"
							iconName="shopping_bag"
							iconSx={{ color: "black" }}
							onClick={console.log}
						/>
						{/* <Box
							display={"flex"}
							flexDirection={"column"}
							alignItems={"center"}
						>
							<IconButton
								iconName="shopping_bag"
								iconSx={{ color: "black" }}
								onClick={console.log}
							/>
							<Typography variant="body2">Избранное</Typography>
						</Box>
						<Box
							display={"flex"}
							flexDirection={"column"}
							alignItems={"center"}
						>
							<IconButton
								iconName="shopping_bag"
								iconSx={{ color: "black" }}
								onClick={console.log}
							/>
							<Typography variant="body2">Корзина</Typography>
						</Box> */}
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
