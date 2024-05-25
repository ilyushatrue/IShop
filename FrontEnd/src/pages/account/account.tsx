import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./profile";
import NotFound from "../not-found/not-found";

export default function Account() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (isLoggedIn === false) {
			navigate("/auth");
		}
	}, [isLoggedIn, navigate]);
	return (
		<Routes>
			<Route path="/" element={<Profile />} />

			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}
