import { httpGet, httpPost } from "./api";

const baseUrl = "/media";
export const mediaApi = {
	uploadFile: (file: FormData) =>
		httpPost<string>({
			url: `${baseUrl}/image/`,
			responseType: "json",
			props: (def) => ({
				...def,
				body: file,
				headers: {},
			}),
		}),
	getImageById: (id: string) =>
		httpGet<File>({
			url: `${baseUrl}/image/${id}`,
			expectedOutput: "blob",
		}),
};
