import api from "./api";
import { ILoginByEmailRequest } from "./contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "./contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "./contracts/authentication/register-request.interface";

const apiAuth = {
	loginByEmailAsync: async (request: ILoginByEmailRequest) =>
		await api.postAsync({
			url: "/auth/login-by-email",
			body: request,
		}),

	loginByPhoneAsync: async (request: ILoginByPhoneRequest) =>
		await api.postAsync({
			url: "/auth/login-by-phone",
			body: request,
		}),

	registerAsync: async (request: IRegisterRequest) =>
		await api.postAsync({
			url: "/auth/register",
			body: request,
		}),

	logoutAsync: async () => await api.postAsync({ url: "/auth/logout" }),
};

export default apiAuth;
