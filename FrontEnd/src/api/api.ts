import getConstant from "../infrastructure/constantProvider";

export type TTryFetch = () => Promise<Response>;
export type ApiResponse<T> = {
	status: Response["status"];
	ok: Response["ok"];
	body?: T;
};

const fetchPipe = async <TOut = any>(
	request: TTryFetch
): Promise<ApiResponse<TOut | undefined>> => {
	let body = undefined;
	let ok = false;
	let status = 500;
	try {
		const response = await request();
		ok = response.ok;
		status = response.status;
		if (ok) {
			try {
				body = await response.json();
			} catch {
				body = undefined;
			}
		}
	} catch {
		console.error("500. Internal server error");
	}
	return {
		body: body,
		ok: ok,
		status: status,
	};
};

const get = async (url: string): Promise<Response> => {
	const fullUrl = getConstant("API_URL") + url;
	return await fetch(fullUrl, {
		method: "GET",
		credentials: "include",
	});
};

const post = async (url: string, data?: any): Promise<Response> => {
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
};

const api = {
	getAsync: async <TOut>(
		url: string
	): Promise<ApiResponse<TOut | undefined>> =>
		await fetchPipe(async () => await get(url)),

	postAsync: async <TIn, TOut = undefined>(
		url: string,
		data?: TIn
	): Promise<ApiResponse<TOut | undefined>> =>
		await fetchPipe(async () => await post(url, data)),
};

export default api;
