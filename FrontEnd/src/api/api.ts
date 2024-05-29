import getConstant from "../infrastructure/constantProvider";

async function tryFetchAsync<T>(
	request: () => Promise<Response>,
): Promise<T | undefined> {
	const attemptsCount = 2;
	try {
		for (let attempt = 1; attempt <= attemptsCount; attempt++) {
			console.log(attempt)
			const response = await request();
			if (response.ok) {
				const result = (await response.json()) as T;
				return result;
			} else {
				switch (response.status) {
					case 401:
						if (attempt === 1) {
							await api.postAsync("/auth/refresh-jwt");
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
}

const api = {
	tryGetAsync: async <TOut>(url: string): Promise<TOut | undefined> =>
		await tryFetchAsync<TOut>(async () => await api.getAsync(url)),

	getAsync: async (url: string): Promise<Response> => {
		const fullUrl = getConstant("API_URL") + url;
		return await fetch(fullUrl, {
			method: "GET",
			credentials: "include",
		})
	},

	tryPostAsync: async <TIn, TOut>(
		url: string,
		data?: TIn
	): Promise<TOut | undefined> => {
		return await tryFetchAsync<TOut>(async () => await api.postAsync<TIn>(url, data));
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

export function redirect(url: string, newTab: boolean = false) {
	if (newTab) {
		window?.open(url, "_blank")?.focus();
	} else {
		window.location.href = url;
	}
}
export default api;
