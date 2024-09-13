import { Box, BoxProps } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import IconButton from "../../components/buttons/icon-button";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export default function AccountPageSideBox({ sx, ...props }: BoxProps) {
	const { xs } = useMediaQueryContext();
	const navigate = useNavigate();
	const menuItems = useAppSelector((state) => state.global.menuItems);
	const pathname = useLocation().pathname;
	if (xs) return null;

	return (
		<Box
			{...props}
			sx={{
				...sx,
				flex: 1,
				overflow: "hidden",
				paddingTop: 4,
				borderRadius: 4,
				boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
				bgcolor: "white",
			}}
		>
			<Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
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
								pathname.substring(0, item.url.length) ===
								item.url
									? "primary.100"
									: undefined,
						}}
					/>
				))}
			</Box>
		</Box>
	);
}
