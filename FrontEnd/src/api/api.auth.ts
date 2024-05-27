import api from "./apiAccessor";
import { ILoginByEmailRequest } from "./contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "./contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "./contracts/authentication/register-request.interface";
import { IUser } from "./interfaces/user/user.interface";

const apiAuth = {
	loginByEmailAsync: async (
		request: ILoginByEmailRequest
	): Promise<IUser | undefined> => {
		return await api.tryPostAsync("/auth/login-by-email", request);
	},
	loginByPhoneAsync: async (
		request: ILoginByPhoneRequest
	): Promise<IUser | undefined> => {
		return await api.tryPostAsync("/auth/login-by-phone", request);
	},
	registerAsync: async (
		request: IRegisterRequest
	): Promise<IUser | undefined> => {
		return await api.tryPostAsync("/auth/register", request);
	},
};

export default apiAuth;