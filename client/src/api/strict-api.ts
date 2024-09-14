import BaseApi, { ApiRequest } from "./base-api";

export default class StrictApi extends BaseApi {
	public static async reauthorize(
		request: Promise<Response>
	): Promise<Response> {
		const attemptsCount = 2;
		let response: Response = null!;
		for (let attempt = 1; attempt <= attemptsCount; attempt++) {
			response = await request;
			if (response.ok || attempt === attemptsCount) {
				break;
			}
			if (response.status === 401 && attempt === 1) {
				const jwtResponse = await super.httpPost({
					url: "/auth/refresh-jwt",
				});
				if (jwtResponse.ok) continue;
			}
			break;
		}
		return response;
	}

	public static async httpGet<TOut>(
		request: ApiRequest,
		onResponse?: (response: Response) => Promise<TOut>
	) {
		const response = await this.reauthorize(
			this.handleRequest("GET", request)
		);
		return this.handleResponse(response, onResponse);
	}
	public static async httpPost<TOut>(
		request: ApiRequest,
		onResponse?: (response: Response) => Promise<TOut>
	) {
		const response = await this.reauthorize(
			this.handleRequest("POST", request)
		);
		return this.handleResponse(response, onResponse);
	}
	public static async httpDelete<TOut>(
		request: ApiRequest,
		onResponse?: (response: Response) => Promise<TOut>
	) {
		const response = await this.reauthorize(
			this.handleRequest("DELETE", request)
		);
		return this.handleResponse(response, onResponse);
	}
	public static async httpPut<TOut>(
		request: ApiRequest,
		onResponse?: (response: Response) => Promise<TOut>
	) {
		const response = await this.reauthorize(
			this.handleRequest("PUT", request)
		);
		return this.handleResponse(response, onResponse);
	}
}
