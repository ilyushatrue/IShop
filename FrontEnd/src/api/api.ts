import getConstant from "../app/infrastructure/constant-provider";
import { StatusCodes } from "./enums/status-codes.enum";

type ApiRequest = {
	url: string;
	anonymous?: boolean;
	body?: any;
	props?: (requestInit: RequestInit) => RequestInit;
};

export type ApiResponse<T> = {
	status: Response["status"];
	ok: Response["ok"];
	body?: T;
	errors: {
		message: string,
		name: string
	}[];
};

const fetchPipe = async (
	request: () => Promise<Response | null>
): Promise<Response | null> => {
	const attemptsCount = 2;
	let response: Response | null = null;
	for (let attempt = 1; attempt <= attemptsCount; attempt++) {
		response = await request();
		if (response === null) {
			if (attempt === attemptsCount) {
				response = null;
				break;
			} else {
				continue;
			}
		}
		if (response.ok) break;
		if (response.status === 401 && attempt === 1) {
			const jwtResponse = await post({
				url: "/auth/refresh-jwt",
				anonymous: true,
			});
			if (jwtResponse?.ok) continue;
			else break;
		} else {
			break;
		}
	}
	return response;
};

const handleResponse = async <TOut>(
	response: Response | null,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const apiResponse: ApiResponse<TOut> = {
		body: undefined,
		errors: [],
		ok: response?.ok ?? false,
		status: StatusCodes.INTERNAL_SERVER_ERROR,
	};
	if (apiResponse.ok) {
		const successResult = await onResponse?.(response!);
		apiResponse.status = response!.status;
		apiResponse.body = successResult;
	} else {
		const { message, name, status } = (await response?.json()) ?? {
			detail: "Ошибка сервера...",
			status: 500,
		};
		apiResponse.status = status;
		apiResponse.errors = [{ message, name }];
	}
	return apiResponse;
};

const handleRequest = async (
	method: string,
	{ url, body, props }: ApiRequest
): Promise<Response | null> => {
	const fullUrl = getConstant("API_URL") + url;
	const defaultRequestInit: RequestInit = {
		method,
		body: body && JSON.stringify(body),
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};
	const requestInit = props?.(defaultRequestInit) || defaultRequestInit;
	try {
		return await fetch(fullUrl, requestInit);
	} catch (error) {
		console.error(error);
		return null;
	}
};

const get = (request: ApiRequest) => handleRequest("GET", request);
const post = (request: ApiRequest) => handleRequest("POST", request);
const remove = (request: ApiRequest) => handleRequest("DELETE", request);
const put = (request: ApiRequest) => handleRequest("PUT", request);

const httpGet = async <TOut>(
	request: ApiRequest,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const response = request.anonymous
		? await get(request)
		: await fetchPipe(() => get(request));
	return handleResponse(response, onResponse);
};

const httpPost = async <TOut = undefined>(
	request: ApiRequest,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const response = request.anonymous
		? await post(request)
		: await fetchPipe(() => post(request));
	return handleResponse(response, onResponse);
};

const httpDelete = async <TOut = undefined>(
	request: ApiRequest,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const response = request.anonymous
		? await remove(request)
		: await fetchPipe(() => remove(request));
	return handleResponse(response, onResponse);
};

const httpPut = async <TOut = undefined>(
	request: ApiRequest,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const response = request.anonymous
		? await put(request)
		: await fetchPipe(() => put(request));
	return handleResponse(response, onResponse);
};

export { httpPut, httpDelete, httpPost, httpGet };
