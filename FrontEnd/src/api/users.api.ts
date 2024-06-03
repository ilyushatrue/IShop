import api from "./api";
import { IUser } from "./interfaces/user/user.interface";

const usersApi = {
	getCurrentAsync: async () =>
		await api.tryFetchAsync<IUser>({
			request: async () => await api.getAsync("/users/current"),
		}),
};

export default usersApi;
