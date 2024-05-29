import getConstant from "../infrastructure/constantProvider";
import { IErrorOr } from "./interfaces/api/error-or.interface";

export type TTryFetch = {
	request: () => Promise<Response>;
	onError?: { message?: string; func?: () => void };
	onSuccess?: { message?: string; func?: () => void };
};


const api = {
	tryFetchAsync: async <T>({ request, onError, onSuccess }: TTryFetch): Promise<IErrorOr<T> | undefined> => {
		const attemptsCount = 2;
		try {
			for (let attempt = 1; attempt <= attemptsCount; attempt++) {
				const response = await request();
				if (response.ok) {
					const result = (await response.json()) as IErrorOr<T>;
					console.log(result)
					return result;
				} else {
					switch (response.status) {
						case 401:
							if (attempt === 1) {
								const jwtResponse = await api.postAsync("/auth/refresh-jwt");
								if (!jwtResponse.ok) return;
								break;
							}
							else {
								//redirect("/auth");
								return;
							}
						default:
							console.error("Error");
							return undefined;
					}
				}
			}
		}
		catch (error) {
			console.error(error)
		}
	},

	getAsync: async (url: string): Promise<Response> => {
		const fullUrl = getConstant("API_URL") + url;
		return await fetch(fullUrl, {
			method: "GET",
			credentials: "include",
		})
	},


	postAsync: async <TIn>(
		url: string,
		data?: TIn
	): Promise<Response> => {
		const fullUrl = getConstant("API_URL") + url;
		return await fetch(fullUrl, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
			credentials: "include",
			headers: data
				? {
					"Content-Type": "application/json",
				}
				: undefined,
		})
	}
}

export default api;
