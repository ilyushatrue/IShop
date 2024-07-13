import { Route, Routes as ReactRoutes } from "react-router-dom";
import Authentication from "../pages/authentication/authentication";
import NotFound from "../pages/not-found/not-found";
import Shop from "../pages/shop/main";
import ProtectedRoutes from "./protected-routes";
import NavBar from "../components/navigation/nav-bar";
import Test from "../pages/test/test";
import ShopCategoryRoutes from "../pages/shop";
import Cart from "../pages/account/cart";

interface IProps {
	sm: boolean;
}
export default function Routes({ sm }: IProps) {
	return (
		<>
			<NavBar sm={sm} />
			<ReactRoutes>
				<Route path="/" element={<Shop />} />
				<Route path="/auth" element={<Authentication sm={sm} />} />
				<Route path="/test" element={<Test />} />
				<Route path="/category/*" element={<ShopCategoryRoutes />} />
				<Route path="/not-found" element={<NotFound />} />
				<Route path="/no-access" element={<NotFound />} />
				<Route path="/cart/*" element={<Cart />} />
				<Route path="*" element={<ProtectedRoutes />} />
			</ReactRoutes>
		</>
	);
}
