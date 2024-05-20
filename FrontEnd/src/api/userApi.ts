import { api } from "./api";
import { ILoginByEmailRequest } from "./interfaces/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "./interfaces/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "./interfaces/authentication/register-request.interface";
import { IUser } from "./interfaces/user/IUser";
export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		loginByEmail: builder.mutation<IUser, ILoginByEmailRequest>({
			query: (credentials) => ({
				url: "/auth/login-by-email",
				method: "POST",
				body: credentials,
			}),
		}),
		loginByPhone: builder.mutation<IUser, ILoginByPhoneRequest>({
			query: (credentials) => ({
				url: "/auth/login-by-phone",
				method: "POST",
				body: credentials,
			}),
		}),
		register: builder.mutation<IUser, IRegisterRequest>({
			query: (credentials) => ({
				url: "/auth/register",
				method: "POST",
				body: credentials,
			}),
		}),
		current: builder.query<IUser, void>({
			query: () => ({
				url: "/users/current",
				method: "GET",
			}),
		}),
		getUserById: builder.query<IUser, string>({
			query: (id) => ({
				url: `/users/${id}`,
				method: "GET",
			}),
		}),
		updateUser: builder.mutation<IUser, { userData: FormData; id: string }>(
			{
				query: ({ userData, id }) => ({
					url: `/users/${id}`,
					method: "PUT",
					body: userData,
				}),
			}
		),
	}),
});

export const {
	useRegisterMutation,
	useLoginByEmailMutation,
	useLoginByPhoneMutation,
	useCurrentQuery,
	useGetUserByIdQuery,
	useLazyCurrentQuery,
	useLazyGetUserByIdQuery,
	useUpdateUserMutation,
} = userApi;

export const {
	endpoints: {
		loginByEmail,
		loginByPhone,
		register,
		current,
		getUserById,
		updateUser,
	},
} = userApi;
