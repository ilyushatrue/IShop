import api from "./api";
import { ILoginByEmailRequest } from "./contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "./contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "./contracts/authentication/register-request.interface";

const apiAuth = {
	loginByEmailAsync: async (
		request: ILoginByEmailRequest
	) => api.tryFetchAsync({
		request: async () => await api.postAsync("/auth/login-by-email", request)
	}),

	loginByPhoneAsync: async (
		request: ILoginByPhoneRequest
	) => await api.tryFetchAsync({
		request: async () => await api.postAsync("/auth/login-by-phone", request)
	}),

	registerAsync: async (
		request: IRegisterRequest
	) => await api.tryFetchAsync({
		request: async () => await api.postAsync("/auth/register", request)
	}),

	logoutAsync: async () => await api.tryFetchAsync({
		request: async () => await api.postAsync("/auth/logout")
	}),
};

export default apiAuth;