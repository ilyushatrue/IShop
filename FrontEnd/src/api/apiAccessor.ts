import getConstant from "../infrastructure/constantProvider";

async function tryFetchAsync<T>(
	request: () => Promise<Response>
): Promise<T | undefined> {
	const fullUrl = getConstant("API_URL");
	const attemptsCount = 2;
	for (let attempt = 1; attempt <= attemptsCount; attempt++) {
		const response = await request();
		if (response.ok) {
			const result = (await response.json()) as T;
			return result;
		} else if (response.status === 401) {
			if (attempt === 1) {
				await api.postAsync(`${fullUrl}/refresh-jwt`);
			} else {
				redirect("/login");
			}
		} else {
			console.error("Error");
			return undefined;
		}
	}
}

const api = {
	getAsync: async <TOut>(url: string): Promise<TOut | undefined> => {
		const fullUrl = getConstant("API_URL") + url;
		return await tryFetchAsync<TOut>(
			async () =>
				await fetch(fullUrl, {
					method: "GET",
					credentials: "include",
				})
		);
	},

	postAsync: async <TIn, TOut>(
		url: string,
		data?: TIn
	): Promise<TOut | undefined> => {
		const fullUrl = getConstant("API_URL") + url;
		return await tryFetchAsync<TOut>(
			async () =>
				await fetch(fullUrl, {
					method: "POST",
					body: data ? JSON.stringify(data) : undefined,
					credentials: "include",
					headers: data
						? {
								"Content-Type": "application/json",
						  }
						: undefined,
				})
		);
	},
};

export function redirect(url: string, newTab: boolean = false) {
	if (newTab) {
		window?.open(url, "_blank")?.focus();
	} else {
		window.location.href = url;
	}
}
export default api;
