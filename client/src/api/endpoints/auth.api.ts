import StrictApi from "../strict-api";
import BaseApi from "../base-api";
import { ILoginByEmailRequest } from "../contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "../contracts/authentication/register-request.interface";

const baseUrl = "/auth";

export default class AuthApi {
	public static async loginByEmailAsync(request: ILoginByEmailRequest) {
		return await BaseApi.httpPost({
			url: `${baseUrl}/login-by-email`,
			body: request,
		});
	}

	public static async loginByPhoneAsync(request: ILoginByPhoneRequest) {
		return await BaseApi.httpPost({
			url: `${baseUrl}/login-by-phone`,
			body: request,
		});
	}

	public static async registerAsync(request: IRegisterRequest) {
		return await BaseApi.httpPost({
			url: `${baseUrl}/register`,
			body: request,
		});
	}

	public static async logoutAsync() {
		return await StrictApi.httpPost({ url: `${baseUrl}/logout` });
	}

	public static async sendResetPasswordEmailAsync(email: string) {
		return await BaseApi.httpPost({
			url: `${baseUrl}/send-reset-password-email`,
			body: email,
		});
	}

	public static async sendEmailConfirmEmailAsync(email: string) {
		const queryString = `?email=${email}`;
		return await BaseApi.httpGet({
			url: `${baseUrl}/send-email-confirm-email${queryString}`,
		});
	}
}
