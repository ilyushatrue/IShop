import { Route, Routes } from "react-router-dom";
import Authentication from "../pages/authentication/authentication";
import NotFound from "../pages/not-found/not-found";
import Shop from "../pages/shop";
import ProtectedRoutes from "./protected-routes";
import NavBar from "../components/navigation/nav-bar";
import Test from "../pages/test/test";

interface IProps {
	sm: boolean;
}
export default function Router({ sm }: IProps) {
	return (
		<>
			<NavBar sm={sm} />
			<Routes>
				<Route path="/" element={<Shop />} />
				<Route path="/auth" element={<Authentication sm={sm} />} />
				<Route path="/test" element={<Test></Test>} />
				<Route path="/not-found" element={<NotFound />} />
				<Route path="/no-access" element={<NotFound />} />
				<Route path="*" element={<ProtectedRoutes />} />
			</Routes>
		</>
	);
}
