import { httpGet, httpPut } from "../api";
import { IUser } from "../interfaces/user/user.interface";
import { IApiInitialResponse } from "../interfaces/api-initial-response.interface";

const usersApi = {
	getCurrentAsync: async () =>
		await httpGet<IApiInitialResponse>(
			{ url: "/users/current", authenticate: true, },
			(r) => r.json()
		),

	getListAsync: async () =>
		await httpGet<IUser[]>({ url: "/users", authenticate: true, }, (r) => r.json()),

	updateUserData: async (data: IUser) =>
		await httpPut({ url: `/users`, body: data, authenticate: true, }),
};

export default usersApi;
