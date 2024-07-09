import { Box, BoxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Page from "../components/page";
import { useAppSelector } from "../app/hooks/redux/use-app-selector";
import IconButton from "../components/icon-button";

export default function ProfilePage({
	isLoading,
	children,
	...props
}: { isLoading?: boolean } & BoxProps) {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const displayWidth = useAppSelector((state) => state.page.displayWidth);
	const navigate = useNavigate();

	return (
		<Page
			isLoading={isLoading}
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
							buttonSx={{ paddingX: 2 }}
						/>
						<IconButton
							iconName="local_shipping"
							onClick={() => navigate("/purchases")}
							caption="Покупки"
							variant="squared"
							fullwidth
							buttonSx={{ paddingX: 2 }}
						/>
						<IconButton
							iconName="shopping_bag"
							onClick={() => navigate("/cart")}
							caption="Корзина"
							variant="squared"
							fullwidth
							buttonSx={{ paddingX: 2 }}
						/>
						<IconButton
							iconName="add_circle"
							onClick={() => navigate("/products/menu")}
							caption="Добавить товар"
							variant="squared"
							fullwidth
							buttonSx={{ paddingX: 2 }}
						/>
						<IconButton
							iconName="people"
							onClick={() => navigate("/users")}
							caption="Пользователи"
							variant="squared"
							fullwidth
							buttonSx={{ paddingX: 2 }}
						/>
						<IconButton
							iconName="settings"
							onClick={() => navigate("/menu")}
							caption="Настройки меню"
							variant="squared"
							fullwidth
							buttonSx={{ paddingX: 2 }}
						/>
					</Box>
				</Box>
				<Box
					flex={1}
					bgcolor={"white"}
					borderRadius={4}
				>
					{children}
				</Box>
			</Box>
		</Page>
	);
}
