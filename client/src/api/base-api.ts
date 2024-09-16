import getConstant from "../app/infrastructure/constant-provider";
import { StatusCodes } from "./enums/status-codes.enum";

export type ApiRequest = {
	url: string;
	body?: any;
	props?: (requestInit: RequestInit) => RequestInit;
};

export type ApiResponse<T> = {
	status: Response["status"];
	ok: Response["ok"];
	body?: T;
	errors: {
		message: string;
		name: string;
	}[];
};

export default class BaseApi {
	public static async handleResponse<TOut>(
		response: Response,
		onResponse?: (response: Response) => Promise<TOut>
	): Promise<ApiResponse<TOut>> {
		const apiResponse: ApiResponse<TOut> = {
			body: undefined,
			errors: [],
			ok: response.ok,
			status: response.status,
		};
		if (response.ok) {
			const successResult = await onResponse?.(response);
			apiResponse.body = successResult;
		} else {
			try {
				const responseContent = await response.json();
				if (responseContent) {
					apiResponse.status = responseContent.status;
					apiResponse.errors = [
						{
							message: responseContent.message,
							name: responseContent.name,
						},
					];
				}
			} catch {
				apiResponse.status = StatusCodes.UNAUTHORIZED;
			}
		}
		return apiResponse;
	}

	public static async handleRequest(
		method: "GET" | "POST" | "PUT" | "DELETE",
		{ url, body, props }: ApiRequest
	): Promise<Response> {
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
	}

	public static async httpGet<TOut>(
		request: ApiRequest,
		onResponse?: (response: Response) => Promise<TOut>
	) {
		const response = await this.handleRequest("GET", request);
		return this.handleResponse(response, onResponse);
	}
	public static async httpPost<TOut>(
		request: ApiRequest,
		onResponse?: (response: Response) => Promise<TOut>
	) {
		const response = await this.handleRequest("POST", request);
		return this.handleResponse(response, onResponse);
	}
	public static async httpDelete<TOut>(
		request: ApiRequest,
		onResponse?: (response: Response) => Promise<TOut>
	) {
		const response = await this.handleRequest("DELETE", request);
		return this.handleResponse(response, onResponse);
	}
	public static async httpPut<TOut>(
		request: ApiRequest,
		onResponse?: (response: Response) => Promise<TOut>
	) {
		const response = await this.handleRequest("PUT", request);
		return this.handleResponse(response, onResponse);
	}
}
