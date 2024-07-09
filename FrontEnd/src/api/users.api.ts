import { httpGet, httpPut } from "./api";
import { IUser } from "./interfaces/user/user.interface";

const usersApi = {
	getCurrentAsync: async () =>
		await httpGet<IUser>(
			{ url: "/users/current" },
			(r) => r.json()
		),

	getListAsync: async () =>
		await httpGet<IUser[]>({ url: "/users" }, (r) => r.json()),

	updateUserData: async (data: IUser) =>
		await httpPut({ url: `/users`, body: data }),
};

export default usersApi;
