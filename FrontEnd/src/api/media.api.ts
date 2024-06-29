import { httpGet, httpPost } from "./api";

const baseUrl = "/media";
export const mediaApi = {
	uploadFile: (file: FormData) =>
		httpPost<string>({
			url: `${baseUrl}/image/`,
			props: (def) => ({
				...def,
				body: file,
				headers: {},
			}),
		}),
	getImageById: (id: string) =>
		httpGet<Blob>({ url: `${baseUrl}/image/${id}` }, (response) => response.blob()),
};
