import BaseApi from "../base-api";

export class TestApi {
	public static async getAllCategories() {
		return await BaseApi.httpGet<boolean>({ url: `/test` }, (response) =>
			response.json()
		);
	}
}
