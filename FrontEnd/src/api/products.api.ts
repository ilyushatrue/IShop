import { httpGet, httpPost, httpPut, httpDelete } from "./api";
import { IProduct } from "./interfaces/product/product.interface";

const baseUrl = "/products";

const productsApi = {
	getAllAsync: async () =>
		await httpGet<IProduct[]>({ url: baseUrl }, (r) => r.json()),

	createAsync: async (product: IProduct) =>
		await httpPost({ url: baseUrl, body: product }),

	deleteByIdAsync: async (id: string) =>
		await httpDelete({ url: `${baseUrl}/${id}` }),

	updateAsync: async (product: IProduct) =>
		await httpPut({ url: baseUrl, body: product }),
};

export default productsApi;
