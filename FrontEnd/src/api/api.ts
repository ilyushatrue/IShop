import getConstant from "../infrastructure/constantProvider";

export type TTryFetch = () => Promise<Response>;

type TPost = {
	url: string;
	body?: any;
	props?: (requestInit: RequestInit) => RequestInit;
};

export type ApiResponse<T> = {
	status: Response["status"];
	ok: Response["ok"];
	body?: T;
};

const fetchPipe = async <TOut = any>(
	request: TTryFetch
): Promise<ApiResponse<TOut | undefined>> => {
	const attemptsCount = 2;
	let body = undefined;
	let ok = false;
	let status = 500;

	try {
		for (let attempt = 1; attempt <= attemptsCount; attempt++) {
			const response = await request();
			ok = response.ok;
			status = response.status;
			if (ok) {
				try {
					body = await response.json();
				} catch {
					body = undefined;
				}
			} else if (response.status === 401 && attempt === 1) {
				const jwtResponse = await post({ url: "/auth/refresh-jwt" });
				if (jwtResponse.ok) continue;
				else break;
			}
			throw new Error("500. Internal server error", { cause: 500 });
		}
	} catch (error) {
		console.error(error);
	}
	return {
		body: body,
		ok: ok,
		status: status,
	};
};

const get = async ({ url }: { url: string }): Promise<Response> => {
	const fullUrl = getConstant("API_URL") + url;
	return await fetch(fullUrl, {
		method: "GET",
		credentials: "include",
	});
};

const post = async ({ url, body, props }: TPost): Promise<Response> => {
	const fullUrl = getConstant("API_URL") + url;
	const defaultRequestInit: RequestInit = {
		method: "POST",
		body: JSON.stringify(body),
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};
	const requestInit = props?.(defaultRequestInit);

	return await fetch(fullUrl, requestInit || defaultRequestInit);
};

const api = {
	getAsync: async <TOut>({
		url,
	}: {
		url: string;
	}): Promise<ApiResponse<TOut | undefined>> =>
		await fetchPipe(async () => await get({ url })),

	postAsync: async <TOut = undefined>({
		url,
		body,
		props,
	}: TPost): Promise<ApiResponse<TOut | undefined>> =>
		await fetchPipe(async () => await post({ url, body, props })),
};

export default api;
