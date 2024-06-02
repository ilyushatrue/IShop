import { Route, Routes, RoutesProps } from "react-router-dom";
import { useAppSelector } from "./hooks/redux/use-app-selector";
import Users from "../pages/users/users";
import NotFound from "../pages/not-found/not-found";

export default function ProtectedRoutes({ children }: RoutesProps) {
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	if (!isAuthenticated) {
		return (
			<Routes>
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route path="/users/*" element={<Users />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}
}
