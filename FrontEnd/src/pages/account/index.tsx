import { Route, Routes } from "react-router-dom";
import Users from "./users/users";
import Purchases from "./purchases";
import Profile from "./profile/profile";
import ProductCategories from "./product-categories";
import ProductMenu from "./products/product-menu";
import NotFound from "../not-found/not-found";
import Cart from "./cart";
import FavoriteProducts from "./favorite-products";

export default function AccountRoutes() {
	return (
		<Routes>
			<Route path="/users/*" element={<Users />} />
			<Route path="/purchases/*" element={<Purchases />} />
			<Route path="/profile/*" element={<Profile />} />
			<Route path="/cart/*" element={<Cart />} />
			<Route path="/categories/*" element={<ProductCategories />} />
			<Route path="/products/*" element={<ProductMenu />} />
			<Route path="/favorites/*" element={<FavoriteProducts />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
