import getConstant from "../infrastructure/constantProvider";

export type TTryFetch = {
	request: () => Promise<Response>;
	onError?: { message?: string; func?: () => void };
	onSuccess?: { message?: string; func?: () => void };
};

const api = {
	tryFetchAsync: async <TOut = any>({
		request,
		onError,
		onSuccess,
	}: TTryFetch): Promise<TOut | undefined> => {
		const attemptsCount = 2;
		try {
			for (let attempt = 1; attempt <= attemptsCount; attempt++) {
				const response = await request();
				switch (response.status) {
					case 200:
						const result = (await response.json()) as TOut;
						return result;
					case 401:
						if (attempt === 1) {
							const jwtResponse = await api.postAsync(
								"/auth/refresh-jwt"
							);
							if (!jwtResponse.ok)
								throw new Error(`401. Не аутентифицирован.`);
							break;
						} else {
							throw new Error(`Требуется аутентификация.`);
						}
					default:
						throw new Error(
							`${response.status}. Не удалось обработать запрос.`
						);
				}
			}
		} catch (error) {
			console.error(error);
		}
	},

	getAsync: async (url: string): Promise<Response> => {
		const fullUrl = getConstant("API_URL") + url;
		return await fetch(fullUrl, {
			method: "GET",
			credentials: "include",
		});
	},

	postAsync: async (url: string, data?: any): Promise<Response> => {
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
		});
	},
};

export default api;
