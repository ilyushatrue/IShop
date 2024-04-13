import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "../pages/authentication/authentication";
import Account from "../pages/account/account";
import Page1 from "../pages/page1";
import Page2 from "../pages/page2";
import NotFound from "../pages/not-found/not-found";
import Users from "../pages/users/users";
import NavBar from "../components/navigation/nav-bar";

interface IProps {
	sm: boolean;
}
export default function Router({ sm }: IProps) {
	return (
		<>
			<NavBar sm={sm} />
			<Routes>
				<Route path="/page1" element={<Page1 />} />
				<Route path="/page2" element={<Page2 />} />
				<Route path="/account/*" element={<Account />} />
				<Route
					path="/login"
					element={<Authentication isRegistered sm={sm} />}
				/>
				<Route
					path="/register"
					element={<Authentication isRegistered={false} sm={sm} />}
				/>
				<Route path="/users/*" element={<Users />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
