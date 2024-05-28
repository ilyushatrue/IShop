import { Route, Routes } from "react-router-dom";
import Authentication from "../pages/authentication/authentication";
import Account from "../pages/account/account";
import Page2 from "../pages/page2";
import NotFound from "../pages/not-found/not-found";
import Users from "../pages/users/users";
import NavBar from "../components/navigation/nav-bar";
import Shop from "../pages/shop";
import ProtectedRoutes from "./protected-routes";

interface IProps {
	sm: boolean;
}
export default function Router({ sm }: IProps) {
	return (
		<>
			<NavBar sm={sm} />
			<Routes>
				<Route path="/shop" element={<Shop />} />
				<Route path="/page2" element={<Page2 />} />
				<Route path="/account/*" element={<Account />} />
				<Route path="/auth" element={<Authentication sm={sm} />} />
				<Route path="/test" element={<></>} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ProtectedRoutes>
				<Route path="/users/*" element={<Users />} />
			</ProtectedRoutes>
		</>
	);
}
