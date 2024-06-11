import api from "./api";
import { IUser } from "./interfaces/user/user.interface";

const usersApi = {
	getCurrentAsync: async () =>
		await api.getAsync<IUser>({ url: "/users/current" }),

	getListAsync: async () => await api.getAsync<IUser[]>({ url: "/users" }),

	updateUserData: async (data: IUser) =>
		await api.putAsync<IUser>({ url: `/users`, body: data }),
};

export default usersApi;
