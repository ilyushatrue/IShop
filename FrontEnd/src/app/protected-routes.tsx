import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/redux/use-app-selector";
import Users from "../pages/account/users/users";
import NotFound from "../pages/not-found/not-found";
import AccountRoutes from "../pages/account";
import ProductRouter from "../pages/account/products";
import Cart from "../pages/account/cart";
import Purchases from "../pages/account/purchases";
import FavoriteProducts from "../pages/account/favorite-products";
import ProductCategories from "../pages/account/product-categories";
import Settings from "../pages/settings";

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
				<Route path="/categories/*" element={<ProductCategories />} />
				<Route path="/users/*" element={<Users />} />
				<Route path="/products/*" element={<ProductRouter />} />
				<Route path="/purchases/*" element={<Purchases />} />
				<Route path="/cart/*" element={<Cart />} />
				<Route path="/favorite/*" element={<FavoriteProducts />} />
				<Route path="/account/*" element={<AccountRoutes />} />
				<Route path="/settings/*" element={<Settings />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}
}
