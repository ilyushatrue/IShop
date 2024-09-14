import StrictApi from "../strict-api";

const baseUrl = "/media";
export default class MediaApi {
	public static async uploadFile(file: FormData) {
		return await StrictApi.httpPost(
			{
				url: `${baseUrl}/image/`,
				props: (def) => ({
					...def,
					body: file,
					headers: {},
				}),
			},
			(response) => response.text()
		);
	}

	public static async getImageById(id: string) {
		return await StrictApi.httpGet(
			{ url: `${baseUrl}/image/${id}` },
			(response) => response.blob()
		);
	}
}
