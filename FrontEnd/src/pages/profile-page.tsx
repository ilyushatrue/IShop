import { Box, BoxProps } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/page";
import { useAppDispatch } from "../app/hooks/redux/use-app-dispatch";
import useApi from "../api/hooks/use-api.hook";
import { useAppSelector } from "../app/hooks/redux/use-app-selector";
import IconButton from "../components/icon-button";

export default function ProfilePage({children, ...props}:BoxProps) {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const displayWidth = useAppSelector((state) => state.page.displayWidth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isFetching, fetchAsync } = useApi();

	return (
		<Page
			isLoading={isFetching}
			sx={{
				maxWidth: displayWidth,
			}}
		>
			<Box
				display={"flex"}
				my={2}
				gap={2}
				minHeight={`calc(100vh - ${navbarHeight + 50}px)`}
			>
				<Box
					overflow={"hidden"}
					width={200}
					minHeight={500}
					paddingTop={4}
					borderRadius={4}
					bgcolor={"white"}
				>
					<Box
						display={"flex"}
						flexDirection={"column"}
						alignItems={"start"}
						gap={2}
					>
						<IconButton
							iconName="person"
							onClick={() => navigate("/account")}
							caption="Мой профиль"
							variant="squared"
							fullwidth
						/>
						<IconButton
							iconName="local_shipping"
							onClick={() => navigate("/purchases")}
							caption="Покупки"
							variant="squared"
							fullwidth
						/>
						<IconButton
							iconName="shopping_bag"
							onClick={() => navigate("/cart")}
							caption="Корзина"
							variant="squared"
							fullwidth
						/>
						<IconButton
							iconName="add_circle"
							onClick={() => navigate("/products/menu")}
							caption="Добавить товар"
							variant="squared"
							fullwidth
						/>
					</Box>
				</Box>
				<Box
					display={"flex"}
					flex={1}
					justifyContent={"center"}
					paddingTop={5}
					bgcolor={"white"}
					borderRadius={4}
				>
					{children}
				</Box>
			</Box>
		</Page>
	);
}
