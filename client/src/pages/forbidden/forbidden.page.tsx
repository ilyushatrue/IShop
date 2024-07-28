import Page from "../../components/page";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

export default function ForbiddenPage() {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	return (
		<Page>
			<Box
				display={"flex"}
				flexDirection={"column"}
				gap={2}
				justifyContent={"center"}
				alignItems={"center"}
				minHeight={`calc(40vh - ${navbarHeight}px)`}
			>
				<Typography variant="h6" fontWeight={"bold"}>
					Вы не авторизованы
				</Typography>
				<Typography >
					Для доступа к личному кабинету необходимо{" "}
					<Link to={"/auth"}>войти</Link>
				</Typography>
			</Box>
		</Page>
	);
}
