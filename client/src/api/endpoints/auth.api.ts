import { httpGet, httpPost } from "./api";
import { ILoginByEmailRequest } from "../contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "../contracts/authentication/register-request.interface";

const baseUrl = "/auth";

const apiAuth = {
	loginByEmailAsync: async (request: ILoginByEmailRequest) =>
		await httpPost({
			url: `${baseUrl}/login-by-email`,
			body: request,
		}),

	loginByPhoneAsync: async (request: ILoginByPhoneRequest) =>
		await httpPost({
			url: `${baseUrl}/login-by-phone`,
			body: request,
		}),

	registerAsync: async (request: IRegisterRequest) =>
		await httpPost({
			url: `${baseUrl}/register`,
			body: request,
		}),

	logoutAsync: async () => await httpPost({ url: `${baseUrl}/logout`, authenticate: true }),

	sendResetPasswordEmailAsync: async (email: string) =>
		await httpPost({
			url: `${baseUrl}/send-reset-password-email`,
			body: email
		}),

	sendEmailConfirmEmailAsync: async (email: string) => {
		const queryString = `?email=${email}`
		return await httpGet({ url: `${baseUrl}/send-email-confirm-email${queryString}` })
	}
};

export default apiAuth;
