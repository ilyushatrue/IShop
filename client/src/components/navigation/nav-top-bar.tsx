import NavTabs from "./tabs/nav-tabs";
import { Box, Grid, Icon, TextField, Typography } from "@mui/material";
import NavAvatar, { IAvatar } from "./nav-avatar";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import IconButton from "../buttons/icon-button";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { setSearchValue } from "../../store/global.slice";

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
export default function NavTopBar({
	menuItems,
	avatar,
	value,
	onChange,
}: IProps) {
	const { navbar, displayWidth } = useAppSelector((state) => state.page);
	const dispatch = useAppDispatch();
	const [searchText, setSearchText] = useState("");
	const favoriteProductsCount = useAppSelector(
		(state) => state.user.favoriteProducts.length
	);
	const { xs, sm } = useMediaQueryContext();
	const navigate = useNavigate();

	const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchText(value);
		dispatch(setSearchValue(value));
	};

	const navigateTo = (path: string) => () => navigate(path);

	return (
		<Box
			position={"fixed"}
			top={0}
			left={0}
			right={0}
			zIndex={100}
			display={"flex"}
			alignItems={"start"}
			justifyContent={"center"}
			height={navbar.height}
			bgcolor={"white"}
			boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
		>
			<Box width={displayWidth} display={"flex"} flexDirection={"column"}>
				<Box height={"60px"} width={"100%"}>
					<Grid container sx={{ width: "100%", marginY: 1 }}>
						<Grid
							xs={0}
							sm={1}
							md={2}
							lg={3}
							item
							sx={{
								display: "flex",
								alignItems: "end",
								gap: 1,
								opacity: "0.9",
							}}
						>
							{!xs && !sm && (
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										height: 30,
										ml: 1,
										cursor: "pointer",
										userSelect: "none",
									}}
									onClick={navigateTo("/")}
								>
									ISHOP
								</Typography>
							)}
						</Grid>
						<Grid
							xs={6}
							item
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<TextField
								onChange={handleSearchValueChange}
								placeholder="телефон iphone"
								value={searchText}
								sx={{
									width: 600,
									padding: 0,
								}}
								inputProps={{
									sx: { paddingY: 1, paddingX: 2 },
								}}
								InputProps={{
									sx: {
										userSelect: "none",
										borderRadius: "12px",
										bgcolor: "rgb(253,253,253)",
									},
									endAdornment: <Icon>search</Icon>,
								}}
								autoComplete="off"
							/>
						</Grid>
						<Grid
							xs={6}
							sm={5}
							md={4}
							lg={3}
							item
							sx={{
								display: "flex",
								justifyContent: "end",
								alignItems: "center",
								gap: 2,
							}}
						>
							<IconButton
								orientation="vertical"
								caption="Заказы"
								iconName="local_shipping"
								iconSx={{ color: "black" }}
								onClick={navigateTo("/my/purchases")}
							/>
							<IconButton
								orientation="vertical"
								caption="Избранное"
								badgeContent={favoriteProductsCount}
								iconName="favorite"
								iconSx={{ color: "black" }}
								onClick={navigateTo("/my/favorites")}
							/>
							<IconButton
								orientation="vertical"
								caption="Корзина"
								iconName="shopping_bag"
								iconSx={{ color: "black" }}
								onClick={navigateTo("/my/cart")}
							/>

							<NavAvatar
								tip={avatar.tip}
								menuItems={avatar.menuItems}
							/>
						</Grid>
					</Grid>
				</Box>
				<Box
					sx={{ display: "flex", alignItems: "end", height: "60px" }}
				>
					<NavTabs
						value={value}
						menuItems={menuItems}
						orientation={"horizontal"}
						onChange={(e, i, href) => onChange(href)}
					/>
				</Box>
			</Box>
		</Box>
	);
}
