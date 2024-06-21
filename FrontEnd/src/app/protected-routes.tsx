import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/redux/use-app-selector";
import Users from "../pages/users/users";
import NotFound from "../pages/not-found/not-found";
import AccountRoutes from "../pages/account/account";
import Goods from "../pages/goods";
import Cart from "../pages/cart";
import Purchases from "../pages/purchases";

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
				<Route path="/goods/*" element={<Goods />} />
				<Route path="/purchases/*" element={<Purchases />} />
				<Route path="/cart/*" element={<Cart />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/account/*" element={<AccountRoutes />} />
			</Routes>
		);
	}
}
