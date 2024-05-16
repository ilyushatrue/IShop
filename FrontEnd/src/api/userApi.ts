import { api } from "./api";
import { IUser } from "./interfaces/user/IUser";
export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		loginByEmail: builder.mutation<{ email: string, password: string }, { email: string }>({
			query: (userData) => ({
				url: '/auth/login',
				method: 'POST',
				body: userData
			})
		}),
		loginByPhone: builder.mutation<{ phone: string, password: string }, { email: string }>({
			query: (userData) => ({
				url: '/auth/login',
				method: 'POST',
				body: userData
			})
		}),
		register: builder.mutation<{ email: string; password: string; name: string }, { email: string; password: string; name: string }>({
			query: (userData) => ({
				url: '/auth/register',
				method: 'POST',
				body: userData
			})
		}),
		current: builder.query<IUser, void>({
			query: () => ({
				url: 'user/current',
				method: 'GET',
			})
		}),
		getUserById: builder.query<IUser, string>({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'GET'
			})
		}),
		updateUser: builder.mutation<IUser, { userData: FormData, id: string }>({
			query: ({ userData, id }) => ({
				url: `/users/${id}`,
				method: 'PUT',
				body: userData
			})
		})
	})
})

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
	endpoints: { loginByEmail, loginByPhone, register, current, getUserById, updateUser }
} = userApi