import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/redux/use-app-selector";
import Users from "../pages/account/users/users";
import NotFound from "../pages/not-found/not-found";
import AccountRoutes from "../pages/account";
import Purchases from "../pages/account/purchases";
import FavoriteProducts from "../pages/account/favorite-products";
import Settings from "../pages/account/settings";
import Profile from "../pages/account/profile/profile";

export default function ProtectedRoutes() {
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
				<Route path="/purchases/*" element={<Purchases />} />
				<Route path="/favorites/*" element={<FavoriteProducts />} />
				<Route path="/settings/*" element={<Settings />} />
				<Route path="/profile/*" element={<Profile />} />
				<Route path="/*" element={<AccountRoutes />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}
}
