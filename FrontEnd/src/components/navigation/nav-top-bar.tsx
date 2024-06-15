import NavTabs from "./tabs/nav-tabs";
import { Box, Button } from "@mui/material";
import NavAvatar, { IAvatar } from "./nav-avatar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

interface IProps {
	menuItems: {
		label: string;
		href: string;
	}[];
	avatar: IAvatar;
	value: number | null;
}
export default function NavTopBar({ menuItems, avatar, value }: IProps) {
	const height = useAppSelector((state) => state.page.navbar.height);
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
			alignItems={"center"}
			height={height}
			bgcolor={"white"}
			boxShadow={"0px 0px 120px rgba(0,0,0,0.1)"}
		>
			<NavTabs
				value={value}
				menuItems={menuItems}
				orientation={"horizontal"}
			/>

			<Box position="fixed" right={0} marginRight={2}>
				{isAuthenticated === false && (
					<Link to={"/auth"}>
						<Button
							sx={{
								padding: 2,
								justifyContent: "start",
							}}
						>
							{"Войти"}
						</Button>
					</Link>
				)}
				{avatar && (
					<NavAvatar
						tip={avatar.tip}
						sx={avatar.sx}
						menuItems={avatar.menuItems}
					/>
				)}
			</Box>
		</Box>
	);
}
