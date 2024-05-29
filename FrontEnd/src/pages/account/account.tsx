import { Route, Routes } from "react-router-dom";
import Profile from "./profile";
import NotFound from "../not-found/not-found";

export default function Account() {
	return (
		<Routes>
			<Route path="/" element={<Profile />} />

			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}
