import api from "./api";
import { IUser } from "./interfaces/user/user.interface";

const usersApi = {
	getCurrentAsync: async () => await api.getAsync<IUser>("/users/current"),
	getListAsync: async () => await api.getAsync<IUser[]>("/users"),
};

export default usersApi;
