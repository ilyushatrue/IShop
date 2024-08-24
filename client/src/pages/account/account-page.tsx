import { Box, BoxProps } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/page";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import IconButton from "../../components/buttons/icon-button";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

interface IProps extends BoxProps {
	sideBoxProps?: BoxProps;
	mainBoxProps?: BoxProps;
}

export default function AccountPage({
	mainBoxProps,
	sideBoxProps,
	children,
	title,
	...props
}: IProps) {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const { screenSize, xs } = useMediaQueryContext();
	const navigate = useNavigate();
	const menuItems = useAppSelector((state) => state.global.menuItems);
	const pathname = useLocation().pathname;
	return (
		<Page {...props} paddingX={xs ? 2 : 0}>
			<Box
				display={"flex"}
				my={2}
				gap={2}
				minHeight={`calc(100vh - ${navbarHeight[screenSize] + 50}px)`}
			>
				{!xs && (
					<Box
						{...sideBoxProps}
						overflow={"hidden"}
						width={200}
						minHeight={500}
						paddingTop={4}
						borderRadius={4}
						boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
						bgcolor={"white"}
					>
						<Box
							display={"flex"}
							flexDirection={"column"}
							alignItems={"start"}
						>
							{menuItems.map((item) => (
								<IconButton
									key={item.name}
									iconName={item.iconName}
									onClick={() => navigate(item.url)}
									caption={item.title}
									variant="squared"
									fullwidth
									buttonSx={{
										"&:hover": {
											bgcolor: "primary.100",
										},
										padding: 2,
										bgcolor:
											pathname.substring(
												0,
												item.url.length
											) === item.url
												? "primary.100"
												: undefined,
									}}
								/>
							))}
						</Box>
					</Box>
				)}
				<Box
					{...mainBoxProps}
					flex={1}
					bgcolor={"white"}
					borderRadius={4}
					boxShadow={"0px 0px 10px rgba(0,0,0,0.1)"}
					overflow={"hidden"}
				>
					{title && (
						<Box
							height={50}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
							margin={0}
							padding={0}
							color={"white"}
							bgcolor={"primary.700"}
						>
							{title}
						</Box>
					)}
					{children}
				</Box>
			</Box>
		</Page>
	);
}
