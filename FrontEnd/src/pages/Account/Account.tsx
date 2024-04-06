import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import NotFound from "../NotFound/NotFound";

export default function Account() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (isLoggedIn === false) {
			navigate("/login");
		}
	}, [isLoggedIn, navigate]);
	return (
		<Routes>
			<Route path="/" element={<Profile />} />

			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}
