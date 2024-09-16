import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Clothes from "./categories/clothes";
import Main from "./main";
import Electronics from "./categories/electronics";
import Yard from "./categories/yard";
import ChildrenCare from "./categories/children-care";

export default function ShopCategoryRoutes() {
	const { pathname } = useLocation();
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route
				path="/clothes/"
				element={<Navigate to={`${pathname}/1`} />}
			/>
			<Route path="/clothes/:pageNum" element={<Clothes />} />
			<Route
				path="/electronics/"
				element={<Navigate to={`${pathname}/1`} />}
			/>
			<Route path="/electronics/:pageNum" element={<Electronics />} />
			<Route
				path="/yard/"
				element={<Navigate to={`${pathname}/1`} />}
			/>
			<Route path="/yard/:pageNum" element={<Yard />} />
			<Route
				path="/child-care/"
				element={<Navigate to={`${pathname}/1`} />}
			/>
			<Route path="/child-care/:pageNum" element={<ChildrenCare />} />
		</Routes>
	);
}
