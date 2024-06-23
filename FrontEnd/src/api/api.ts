import getConstant from "../infrastructure/constantProvider";

type TPost = {
	url: string;
	body?: any;
	expectedOutput?: "text" | "json" | "blob" | "none";
	props?: (requestInit: RequestInit) => RequestInit;
};

export type ApiResponse<T> = {
	status: Response["status"];
	ok: Response["ok"];
	body?: {
		errors: { description: string }[];
		isError: boolean;
		value: T;
	};
};

const fetchPipe = async <TOut = any>({
	request,
	expectedOutput = "none",
}: {
	request: () => Promise<Response>;
	expectedOutput: "text" | "json" | "blob" | "none";
}): Promise<ApiResponse<TOut | undefined>> => {
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
				if (expectedOutput === "none") break;
				try {
					switch (expectedOutput) {
						case "blob":
							body = await response.blob();
							break;
						case "json":
							body = await response.json();
							break;
						case "text":
							body = await response.text();
							break;
					}
				} catch {
					body = undefined;
				}
				break;
			} else {
				if (status === 401 && attempt === 1) {
					const jwtResponse = await post({
						url: "/auth/refresh-jwt",
					});
					if (jwtResponse.ok) continue;
					else break;
				}
				throw new Error(`${status}. ${response.statusText}`, {
					cause: status,
				});
			}
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

const remove = async ({ url, body, props }: TPost): Promise<Response> => {
	const fullUrl = getConstant("API_URL") + url;
	const defaultRequestInit: RequestInit = {
		method: "DELETE",
		body: JSON.stringify(body),
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};
	const requestInit = props?.(defaultRequestInit);

	return await fetch(fullUrl, requestInit || defaultRequestInit);
};

const put = async ({ url, body, props }: TPost): Promise<Response> => {
	console.log(body);
	const fullUrl = getConstant("API_URL") + url;
	const defaultRequestInit: RequestInit = {
		method: "PUT",
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
		expectedOutput = "json",
	}: {
		url: string;
		expectedOutput?: "text" | "json" | "blob" | "none";
	}): Promise<ApiResponse<TOut | undefined>> =>
		await fetchPipe({
			request: async () => await get({ url }),
			expectedOutput: expectedOutput,
		}),

	postAsync: async <TOut = undefined>({
		url,
		body,
		expectedOutput = "none",
		props,
	}: TPost): Promise<ApiResponse<TOut | undefined>> =>
		await fetchPipe({
			request: async () =>
				await post({ url, body, expectedOutput, props }),
			expectedOutput: expectedOutput,
		}),

	deleteAsync: async <TOut = undefined>({
		url,
		body,
		expectedOutput = "none",
		props,
	}: TPost): Promise<ApiResponse<TOut | undefined>> =>
		await fetchPipe({
			request: async () =>
				await remove({ url, body, expectedOutput, props }),
			expectedOutput: expectedOutput,
		}),

	putAsync: async <TOut = undefined>({
		url,
		body,
		expectedOutput = "none",
		props,
	}: TPost): Promise<ApiResponse<TOut | undefined>> =>
		await fetchPipe({
			request: async () =>
				await put({ url, body, expectedOutput, props }),
			expectedOutput: expectedOutput,
		}),
};

export default api;
