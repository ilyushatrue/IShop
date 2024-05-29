import api from "./api";
import { IUser } from "./interfaces/user/user.interface";

const UsersApi = {
	getCurrentAsync: async (): Promise<IUser | undefined> => {
		return await api.tryGetAsync("/users/current");
	},
};

export default UsersApi;
