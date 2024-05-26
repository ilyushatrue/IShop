import { useState } from "react";
import LoginByEmailForm from "./login-by-email-form";
import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import { useLazyCurrentQuery, useLoginByEmailMutation } from "../../../api/userApi";

export default function LoginByEmail() {
	const [login, { isLoading }] = useLoginByEmailMutation();
	const [error, setError] = useState<string | null>(null);
	const [triggerCurrentQuery] = useLazyCurrentQuery();

	async function handleSubmit(data: ILoginByEmailRequest) {
		try {
			await login(data).unwrap();
		} catch (error: any) {
			setError(error.data.title);
			console.error(error);
		}
	}
	// async function login(data: ILoginByEmailRequest) {
	// 	try {
	// 		let url = "/auth/login-by-email";
	// 		const fetchResult = await api.postAsync(url, data);
	// 		console.log(fetchResult);
	// 		onLogin();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
	return(<LoginByEmailForm onSubmit={handleSubmit} />)
}
