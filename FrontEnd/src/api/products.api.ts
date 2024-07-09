import { httpGet, httpPost, httpPut, httpDelete } from "./api";
import { ICreateProductCategoryCommand } from "./interfaces/product/categories/create-product-category-command.interface";
import { IProductCategory } from "./interfaces/product/categories/product-category.interface";
import { ICreateProductCommand } from "./interfaces/product/create-product-command.interface";
import { IProduct } from "./interfaces/product/product.interface";

const baseUrl = "/products";

const productsApi = {
	getAllAsync: async () =>
		await httpGet<IProduct[]>({ url: baseUrl }, (response) => response.json()),

	getAllCategories: async () => await httpGet<IProductCategory[]>({ url: `${baseUrl}/categories` }, response => response.json()),

	createAsync: async (product: ICreateProductCommand) =>
		await httpPost({ url: baseUrl, body: product }),

	createCategoryAsync: async (category: ICreateProductCategoryCommand) =>
		await httpPost({ url: `${baseUrl}/categories`, body: category }),

	syncCategoriesAsync: async (categories: IProductCategory[]) =>
		await httpPut({ url: `${baseUrl}/categories`, body: categories }),

	deleteByIdAsync: async (id: string) =>
		await httpDelete({ url: `${baseUrl}/${id}` }),

	updateAsync: async (product: IProduct) =>
		await httpPut({ url: baseUrl, body: product }),
};

export default productsApi;

