import { httpGet, httpPost } from "./api";

const baseUrl = "/media";
export const mediaApi = {
	uploadFile: (file: FormData) =>
		httpPost(
			{
				url: `${baseUrl}/image/`,

				props: (def) => ({
					...def,
					body: file,
					headers: {},
				}),
			},
			(response) => response.text()
		),
	getImageById: (id: string) =>
		httpGet({ url: `${baseUrl}/image/${id}` }, (response) =>
			response.blob()
		),
};
