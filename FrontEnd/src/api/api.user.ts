import api from "./apiAccessor";
import { IUser } from "./interfaces/user/user.interface";

const apiUsers = {
	getCurrentAsync: async (): Promise<IUser | undefined> => {
		return await api.tryGetAsync("/users/current");
	},
};

export default apiUsers;
