import { Route, Routes as ReactRoutes } from "react-router-dom";
import NotFound from "../pages/not-found/not-found";
import Shop from "../pages/shop/main";
import NavBar from "../components/navigation/nav-bar";
import Test from "../pages/test/test";
import ShopCategoryRoutes from "../pages/shop";
import ForbiddenPage from "../pages/forbidden/forbidden.page";
import AccountRoutes from "../pages/account";
import ProductPage from "../pages/shop/product-page";
import Authentication from "../pages/authentication";

export default function Routes() {
	return (
		<>
			<NavBar />
			<ReactRoutes>
				<Route path="/" element={<Shop />} />
				<Route path="/auth" element={<Authentication />} />
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
