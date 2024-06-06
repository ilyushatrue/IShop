import { useState } from "react";
import Register from "./register/register";
import Login from "./login";
import Page from "../../components/page";

interface IProps {
	sm?: boolean;
}
export default function Authentication({ sm = false }: IProps) {
	const [hasAccount, setHasAccount] = useState(true);

	return (
		<Page isLoading={false}>
			{hasAccount ? (
				<Login sm={sm} onToRegisterClick={() => setHasAccount(false)} />
			) : (
				<Register sm={sm} onToLoginClick={() => setHasAccount(true)} />
			)}
		</Page>
	);
}
