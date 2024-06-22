import { IUserCredentialsRequest } from "../pages/account/profile/profile";
import api from "./api";
import { IUser } from "./interfaces/user/user.interface";

const usersApi = {
	getCurrentAsync: async () =>
		await api.getAsync<IUser>({ url: "/users/current" }),

	getListAsync: async () => await api.getAsync<IUser[]>({ url: "/users" }),

	updateUserData: async (data: IUserCredentialsRequest) =>
		await api.putAsync({ url: `/users`, body: data }),
};

export default usersApi;
