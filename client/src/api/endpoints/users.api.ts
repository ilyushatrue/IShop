import { IUser } from "../interfaces/user/user.interface";
import { IApiInitialResponse } from "../interfaces/api-initial-response.interface";
import StrictApi from "../strict-api";

export default class UsersApi {
	public static async getCurrentAsync() {
		return await StrictApi.httpGet<IApiInitialResponse>(
			{ url: "/users/current" },
			(r) => r.json()
		);
	}

	public static async getListAsync() {
		return await StrictApi.httpGet<IUser[]>({ url: "/users" }, (r) =>
			r.json()
		);
	}

	public static async updateUserData(data: IUser) {
		return await StrictApi.httpPut({ url: `/users`, body: data });
	}
}
