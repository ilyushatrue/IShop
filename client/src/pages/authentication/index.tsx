import { useState } from "react";
import Register from "./register/register";
import Login from "./login";

export default function Authentication() {
	const [hasAccount, setHasAccount] = useState(true);

	return hasAccount ? (
		<Login onToRegisterClick={() => setHasAccount(false)} />
	) : (
		<Register onToLoginClick={() => setHasAccount(true)} />
	);
}
