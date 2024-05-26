import api from "./apiAccessor";
import { ILoginByEmailRequest } from "./contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "./contracts/authentication/login-by-phone-request.interface";
import { IUser } from "./interfaces/user/user.interface";

const apiUser = {
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
};

export default apiUser;
//IUser, ILoginByEmailRequest>({

// 	query: (credentials) => ({
// 		url: "/auth/login-by-email",
// 		method: "POST",
// 		body: credentials,
// 	}),
// }),
// loginByPhone: builder.mutation<IUser, ILoginByPhoneRequest>({
// 	query: (credentials) => ({
// 		url: "/auth/login-by-phone",
// 		method: "POST",
// 		body: credentials,
// 	}),
// }),
// register: builder.mutation<IUser, IRegisterRequest>({
// 	query: (credentials) => ({
// 		url: "/auth/register",
// 		method: "POST",
// 		body: credentials,
// 	}),
// }),
// current: builder.query<IUser, void>({
// 	query: () => ({
// 		url: "/users/current",
// 		method: "GET",
// 	}),
// }),
// getUserById: builder.query<IUser, string>({
// 	query: (id) => ({
// 		url: `/users/${id}`,
// 		method: "GET",
// 	}),
// }),
// updateUser: builder.mutation<IUser, { userData: FormData; id: string }>(
// 	{
// 		query: ({ userData, id }) => ({
// 			url: `/users/${id}`,
// 			method: "PUT",
// 			body: userData,
// 		}),
// 	}
// ),
