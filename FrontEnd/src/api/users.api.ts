import { IUserCredentialsRequest } from "../pages/account/profile/profile";
import { httpGet, httpPut } from "./api";
import { IUser } from "./interfaces/user/user.interface";

const usersApi = {
	getCurrentAsync: async () =>
		await httpGet<IUser>({ url: "/users/current" }),

	getListAsync: async () => await httpGet<IUser[]>({ url: "/users" }),

	updateUserData: async (data: IUserCredentialsRequest) =>
		await httpPut({ url: `/users`, body: data }),
};

export default usersApi;
