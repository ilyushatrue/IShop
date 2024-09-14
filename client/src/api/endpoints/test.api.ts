import BaseApi from "../base-api";

export class TestApi {
	public static async getAllCategories(signal: AbortSignal) {
		return await BaseApi.httpGet<boolean>(
			{
				url: `/test`,
				props: (defaultProps) => ({ ...defaultProps, signal: signal }),
			},
			(response) => response.json()
		);
	}
}
