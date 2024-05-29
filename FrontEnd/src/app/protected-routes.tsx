import { Route, Routes, RoutesProps, useNavigate } from "react-router-dom";
import { useAppSelector } from "./hooks/redux/use-app-selector";
import Users from "../pages/users/users";
import NotFound from "../pages/not-found/not-found";
import NoAccess from "../pages/no-access/no-access.page";

export default function ProtectedRoutes({ children }: RoutesProps) {
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	if (!isAuthenticated) {
		return (
		<Routes>
			<Route path="*" element={<NoAccess />} />
		</Routes>);
	} else {
		return (
			<Routes>
				<Route path="/users/*" element={<Users />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}
}
