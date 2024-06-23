import api from "./api";
import { IProduct } from "./interfaces/product/product.interface";

const baseUrl = "/products";

const productsApi = {
	getAllAsync: async () => await api.getAsync<IProduct[]>({ url: baseUrl }),

	createAsync: async (product: IProduct) =>
		await api.postAsync<IProduct>({ url: baseUrl, body: product }),

	deleteByIdAsync: async (id: string) =>
		await api.deleteAsync<IProduct>({ url: `${baseUrl}/${id}` }),

	updateAsync: async (product: IProduct) =>
		await api.putAsync<IProduct>({ url: baseUrl, body: product }),
};

export default productsApi;
