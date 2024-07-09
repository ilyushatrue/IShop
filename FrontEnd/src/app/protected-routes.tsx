import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/redux/use-app-selector";
import Users from "../pages/users/users";
import NotFound from "../pages/not-found/not-found";
import AccountRoutes from "../pages/account/account";
import ProductRouter from "../pages/products";
import Cart from "../pages/cart";
import Purchases from "../pages/purchases";
import FavoriteProducts from "../pages/favorite-products";
import Menu from "../pages/menu";

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
				<Route path="/menu/*" element={<Menu />} />
				<Route path="/users/*" element={<Users />} />
				<Route path="/products/*" element={<ProductRouter />} />
				<Route path="/purchases/*" element={<Purchases />} />
				<Route path="/cart/*" element={<Cart />} />
				<Route path="/favorite/*" element={<FavoriteProducts />} />
				<Route path="/account/*" element={<AccountRoutes />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}
}
