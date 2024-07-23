import { Route, Routes as ReactRoutes } from "react-router-dom";
import Authentication from "../pages/authentication/authentication";
import NotFound from "../pages/not-found/not-found";
import Shop from "../pages/shop/main";
import NavBar from "../components/navigation/nav-bar";
import Test from "../pages/test/test";
import ShopCategoryRoutes from "../pages/shop";
import ForbiddenPage from "../pages/forbidden/forbidden.page";
import AccountRoutes from "../pages/account";
import ProductPage from "../pages/shop/product-page";

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
				<Route path="/product/:id" element={<ProductPage />} />
				<Route path="/no-access" element={<ForbiddenPage />} />
				<Route path="/my/*" element={<AccountRoutes />} />
				<Route path="*" element={<NotFound />} />
			</ReactRoutes>
		</>
	);
}
