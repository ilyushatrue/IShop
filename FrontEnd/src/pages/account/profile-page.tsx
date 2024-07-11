import { Box, BoxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import IconButton from "../../components/icon-button";
import { ReactNode } from "react";

interface IProps extends BoxProps {
	sideBoxProps?: BoxProps;
	mainBoxProps?: BoxProps;
	children: ReactNode;
}

export default function ProfilePage({
	mainBoxProps,
	sideBoxProps,
	children,
	...props
}: IProps) {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const navigate = useNavigate();

	return (
		<Page {...props}>
			<Box
				display={"flex"}
				my={2}
				gap={2}
				minHeight={`calc(100vh - ${navbarHeight + 50}px)`}
			>
				<Box
					{...sideBoxProps}
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
							iconName="category"
							onClick={() => navigate("/categories")}
							caption="Категории товаров"
							variant="squared"
							fullwidth
							buttonSx={{ paddingX: 2 }}
						/>
						<IconButton
							iconName="settings"
							onClick={() => navigate("/settings")}
							caption="Настройки меню"
							variant="squared"
							fullwidth
							buttonSx={{ paddingX: 2 }}
						/>
					</Box>
				</Box>
				<Box
					{...mainBoxProps}
					flex={1}
					bgcolor={"white"}
					borderRadius={4}
					overflow={"hidden"}
				>
					{children}
				</Box>
			</Box>
		</Page>
	);
}
