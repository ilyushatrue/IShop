import { BoxProps } from "@mui/material";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import AccountPage from "./account-page";
import ForbiddenPage from "../forbidden/forbidden.page";

export default function AccountProtectedPage(props: BoxProps) {
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	if (isAuthenticated) {
		return <AccountPage {...props} />;
	} else {
		return <ForbiddenPage />;
	}
}
