import React from "react";
import ProfilePage from "../profile-page";
import ProfileProtectedPage from "../profile-protected-page";

export default function Purchases() {
	return (
		<ProfileProtectedPage title="Покупки">
			<div>Purchases</div>
		</ProfileProtectedPage>
	);
}
