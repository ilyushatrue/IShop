import { BoxProps } from "@mui/material";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import ProfilePage from "./profile-page";
import ForbiddenPage from "../forbidden/forbidden.page";

interface IProps extends BoxProps {
	sideBoxProps?: BoxProps;
	mainBoxProps?: BoxProps;
}

export default function ProfileProtectedPage(props: IProps) {
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	if (isAuthenticated) {
		return <ProfilePage {...props} />;
	} else {
		return <ForbiddenPage />;
	}
}
