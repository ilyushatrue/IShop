import api from "./api";

const baseUrl = "/media";
export const mediaApi = {
	uploadFile: (file: FormData) =>
		api.postAsync<string>({
			url: `${baseUrl}/image/`,
			expectedOutput: "json",
			props: (def) => ({
				...def,
				body: file,
				headers: {},
			}),
		}),
	getImageById: (id: string) =>
		api.getAsync<File>({
			url: `${baseUrl}/image/${id}`,
			expectedOutput: "blob",
		}),
};
