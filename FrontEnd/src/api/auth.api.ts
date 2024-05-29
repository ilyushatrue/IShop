import api from "./api";
import { ILoginByEmailRequest } from "./contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "./contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "./contracts/authentication/register-request.interface";
import { IErrorOr } from "./interfaces/api/error-or.interface";

const apiAuth = {
	loginByEmailAsync: async (
		request: ILoginByEmailRequest
	): Promise<IErrorOr<undefined>> => {
		const response = await api.postAsync("/auth/login-by-email", request);
		const result = (await response.json()) as IErrorOr<undefined>;
		console.log(result)
		return result;
	},
	loginByPhoneAsync: async (
		request: ILoginByPhoneRequest
	): Promise<IErrorOr<undefined>> => {
		const response = await api.postAsync("/auth/login-by-phone", request);
		const result = (await response.json()) as IErrorOr<undefined>;
		console.log(result)
		return result;
	},
	registerAsync: async (
		request: IRegisterRequest
	): Promise<IErrorOr<undefined>> => {
		const response = await api.postAsync("/auth/register", request);
		const result = (await response.json()) as IErrorOr<undefined>;
		console.log(result)
		return result;
	},
};

export default apiAuth;