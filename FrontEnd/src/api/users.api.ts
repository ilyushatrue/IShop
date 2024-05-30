import api from "./api";
import { IUser } from "./interfaces/user/user.interface";

const usersApi = {
	getCurrentAsync: async () => api.tryFetchAsync<IUser>({
		request: async () => api.getAsync("/users/current")
	}),
};

export default usersApi;
