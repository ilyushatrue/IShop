import api from "../../../api/apiAccessor";
import {
	useLazyCurrentQuery,
	useLoginByPhoneMutation,
} from "../../../api/userApi";
import { useEffect, useRef, useState } from "react";
import LoginByPhoneForm from "./login-by-phone-form";
import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";

export default function LoginByPhone() {
	const [login, { isLoading }] = useLoginByPhoneMutation();
	const [triggerCurrentQuery] = useLazyCurrentQuery();
	const [error, setError] = useState<string | null>(null);
	async function handleSubmit(data: ILoginByPhoneRequest) {
		try {
			await login(data).unwrap();
		} catch (error) {
			console.error(error);
		}
	}
	async function tryLogin(data: ILoginByPhoneRequest) {
		try {
			let url = "/auth/login-by-phone";
			const fetchResult = await api.postAsync(url, data);
			console.log(fetchResult);
		} catch (error) {
			console.error(error);
		}
	}
	return <LoginByPhoneForm onSubmit={handleSubmit} />;
}
