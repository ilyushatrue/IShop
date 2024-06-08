import api from "./api";

const baseUrl = "/media";
export const mediaApi = {
	uploadFile: (file: File) => api.postAsync<File, string>(`${baseUrl}/image/`, file),
	getImageById: (id: string) => api.getAsync<File>(`${baseUrl}/image/${id}`),
	// return dataProviderV2(baseUrl, "post", fd, {
	// 	requestType: "raw",
	// });
};
