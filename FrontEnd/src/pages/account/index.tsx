import { Route, Routes } from "react-router-dom";
import ProductCategories from "./product-categories";
import ProductMenu from "./products/product-menu";

export default function AccountRoutes() {
	return (
		<Routes>
			<Route path="/categories/*" element={<ProductCategories />} />
			<Route path="/products/*" element={<ProductMenu />} />
		</Routes>
	);
}
