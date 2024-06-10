import api from "./api";
import { IUser } from "./interfaces/user/user.interface";

const usersApi = {
	getCurrentAsync: async () =>
		await api.getAsync<IUser>({ url: "/users/current" }),
	
	getListAsync: async () => await api.getAsync<IUser[]>({ url: "/users" }),
};

export default usersApi;
