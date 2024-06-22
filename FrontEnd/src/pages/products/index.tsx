import { Route, Routes } from "react-router-dom";
import ProductMenu from "./product-menu";
import ProductAdd from "./product-add";

export default function ProductRouter() {
	return (
		<Routes>
			<Route path="/menu" element={<ProductMenu />} />
			<Route path="/add" element={<ProductAdd />} />
		</Routes>
	);
}
