import { useState } from "react";
import Register from "./register/register";
import Login from "./login";
import Page from "../../components/page";


export default function Authentication() {
	const [hasAccount, setHasAccount] = useState(true);

	return (
		<Page>
			{hasAccount ? (
				<Login onToRegisterClick={() => setHasAccount(false)} />
			) : (
				<Register  onToLoginClick={() => setHasAccount(true)} />
			)}
		</Page>
	);
}
