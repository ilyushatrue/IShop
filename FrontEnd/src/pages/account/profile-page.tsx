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
	const menuItems = useAppSelector((state) => state.global.menuItems);

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
						{menuItems.map((item) => (
							<IconButton
								iconName={item.iconName}
								onClick={() => navigate(item.url)}
								caption={item.title}
								variant="squared"
								fullwidth
								buttonSx={{ paddingX: 2 }}
							/>
						))}
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
