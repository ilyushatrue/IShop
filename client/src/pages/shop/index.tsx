import { Route, Routes } from "react-router-dom";
import Clothes from "./categories/clothes";
import Main from "./main";
import Electronics from "./categories/electronics";
import Yard from "./categories/yard";
import ChilrdenCare from "./categories/children-care";

export default function ShopCategoryRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/clothes/" element={<Clothes />} />
			<Route path="/clothes/:pageNum" element={<Clothes />} />
			<Route path="/electronics/" element={<Electronics />} />
			<Route path="/electronics/:pageNum" element={<Electronics />} />
			<Route path="/yard/" element={<Yard />} />
			<Route path="/yard/:pageNum" element={<Yard />} />
			<Route path="/child-care/" element={<ChilrdenCare />} />
			<Route path="/child-care/:pageNum" element={<ChilrdenCare />} />
		</Routes>
	);
}
