import { Route, Routes } from "react-router-dom";
import ProductsMenu from "./products-menu";
import ProductEdit from "./product-edit/product-edit";

export default function ProductRoutes() {
	return (
		<Routes>
			<Route path="/:category/" element={<ProductsMenu />} />
			<Route path="/:category/add" element={<ProductEdit />} />
			<Route path="/:category/:id" element={<ProductEdit />} />
		</Routes>
	);
}
