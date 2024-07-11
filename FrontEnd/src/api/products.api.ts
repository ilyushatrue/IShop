import { httpGet, httpPost, httpPut, httpDelete } from "./api";
import { ICreateProductCategoryCommand } from "./interfaces/product-categories/commands/create-product-category-command.interface";
import { IProductCategory } from "./interfaces/product-categories/queries/product-category.interface";
import { ICreateProductCommand } from "./interfaces/product/commands/create-product-command.interface";
import { IProduct } from "./interfaces/product/product.interface";

const baseUrl = "/products";

const productsApi = {
	getAllAsync: async (categoryId?: number) => {
		const queryString = categoryId ? `?categoryId=${categoryId}` : ""
		return await httpGet<IProduct[]>({ url: baseUrl + queryString }, response => response.json());
	},

	getAllCategories: async () => await httpGet<IProductCategory[]>({ url: `${baseUrl}/categories` }, response => response.json()),

	createAsync: async (product: ICreateProductCommand) =>
		await httpPost({ url: baseUrl, body: product, authenticate: true, }),

	createCategoryAsync: async (category: ICreateProductCategoryCommand) =>
		await httpPost({ url: `${baseUrl}/categories`, body: category, authenticate: true, }),

	syncCategoriesAsync: async (categories: IProductCategory[]) =>
		await httpPut({ url: `${baseUrl}/categories`, body: categories, authenticate: true, }),

	deleteByIdAsync: async (id: string) =>
		await httpDelete({ url: `${baseUrl}/${id}`, authenticate: true, }),

	updateAsync: async (product: IProduct) =>
		await httpPut({ url: baseUrl, body: product, authenticate: true, }),
};

export default productsApi;

