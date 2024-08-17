import { BoxProps } from "@mui/material";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import AccountPage from "./account-page"; 
import ForbiddenPage from "../forbidden/forbidden.page";

interface IProps extends BoxProps {
	sideBoxProps?: BoxProps;
	mainBoxProps?: BoxProps;
}

export default function AccountProtectedPage(props: IProps) {
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	if (isAuthenticated) {
		return <AccountPage {...props} />;
	} else {
		return <ForbiddenPage />;
	}
}
