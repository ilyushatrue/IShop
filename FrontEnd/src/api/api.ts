import getConstant from "../infrastructure/constantProvider";
import { StatusCodes } from "./enums/status-codes.enum";

type ApiRequest = {
	url: string;
	unauthorized?: boolean;
	body?: any;
	props?: (requestInit: RequestInit) => RequestInit;
};

export type ApiResponse<T> = {
	status: Response["status"];
	ok: Response["ok"];
	body?: T;
	errors: string[];
};

const fetchPipe = async (
	request: () => Promise<Response>
): Promise<Response> => {
	const attemptsCount = 2;
	let response: Response;
	for (let attempt = 1; attempt <= attemptsCount; attempt++) {
		response = await request();
		if (response.ok) break;
		if (response.status === 401 && attempt === 1) {
			const jwtResponse = await post({
				url: "/auth/refresh-jwt",
			});
			if (jwtResponse.ok) continue;
			else break;
		} else {
			break;
		}
	}
	return response!;
};

const handleResponse = async <TOut>(
	response: Response,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const apiResponse: ApiResponse<TOut> = {
		body: undefined,
		errors: [],
		ok: response.ok,
		status: StatusCodes.INTERNAL_SERVER_ERROR,
	};
	if (response.ok) {
		const successResult =
			(await onResponse?.(response)) ?? ((await response.json()) as TOut);
		apiResponse.status = response.status;
		apiResponse.body = successResult;
	} else {
		const { detail, status } = await response.json();
		apiResponse.status = status;
		apiResponse.errors = [detail];
	}
	return apiResponse;
};

const handleRequest = async (
	method: string,
	{ url, body, props }: ApiRequest
): Promise<Response> => {
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
	return await fetch(fullUrl, requestInit);
};

const get = (request: ApiRequest) => handleRequest("GET", request);
const post = (request: ApiRequest) => handleRequest("POST", request);
const remove = (request: ApiRequest) => handleRequest("DELETE", request);
const put = (request: ApiRequest) => handleRequest("PUT", request);

const httpGet = async <TOut>(
	request: ApiRequest,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const response = request.unauthorized
		? await get(request)
		: await fetchPipe(() => get(request));
	return handleResponse(response, onResponse);
};

const httpPost = async <TOut = undefined>(
	request: ApiRequest,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const response = request.unauthorized
		? await post(request)
		: await fetchPipe(() => post(request));
	return handleResponse(response, onResponse);
};

const httpDelete = async <TOut = undefined>(
	request: ApiRequest,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const response = request.unauthorized
		? await remove(request)
		: await fetchPipe(() => remove(request));
	return handleResponse(response, onResponse);
};

const httpPut = async <TOut = undefined>(
	request: ApiRequest,
	onResponse?: (response: Response) => Promise<TOut>
): Promise<ApiResponse<TOut>> => {
	const response = request.unauthorized
		? await put(request)
		: await fetchPipe(() => put(request));
	return handleResponse(response, onResponse);
};

export { httpPut, httpDelete, httpPost, httpGet };
