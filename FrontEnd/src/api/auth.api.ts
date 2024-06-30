import { httpGet, httpPost } from "./api";
import { ILoginByEmailRequest } from "./contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "./contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "./contracts/authentication/register-request.interface";

const baseUrl = "/auth";

const apiAuth = {
	loginByEmailAsync: async (request: ILoginByEmailRequest) =>
		await httpPost({
			url: `${baseUrl}/login-by-email`,
			anonymous: true,
			body: request,
		}),

	loginByPhoneAsync: async (request: ILoginByPhoneRequest) =>
		await httpPost({
			url: `${baseUrl}/login-by-phone`,
			anonymous: true,
			body: request,
		}),

	registerAsync: async (request: IRegisterRequest) =>
		await httpPost({
			url: `${baseUrl}/register`,
			anonymous: true,
			body: request,
		}),

	logoutAsync: async () => await httpPost({ url: `${baseUrl}/logout` }),

	sendResetPasswordEmailAsync: async (email: string) =>
		await httpPost({
			url: `${baseUrl}/send-reset-password-email`,
			anonymous: true,
			body: email
		}),
};

export default apiAuth;
