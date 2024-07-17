import { httpGet, httpPost, httpPut, httpDelete } from "./api";
import { ICreateProductCategoryCommand } from "../interfaces/product-categories/commands/create-product-category-command.interface";
import { IProductCategory } from "../interfaces/product-categories/product-category.interface";
import { ICreateProductCommand } from "../interfaces/product/commands/create-product-command.interface";
import { IProduct } from "../interfaces/product/product.interface";
import { IPager } from "../interfaces/pager.interface";

const baseUrl = "/products";

const productsApi = {
	getAllAsync: async (page: number, pageSize: number) => {
		const queryString = `?page=${page}&pageSize=${pageSize}`;
		return await httpGet<IPager<IProduct>>({ url: baseUrl + queryString }, response => response.json());
	},
	getByCategoryAsync: async (categoryId: number, page: number, pageSize: number) => {
		const queryString = `?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`;
		return await httpGet<IPager<IProduct>>({ url: `${baseUrl}/by-category${queryString}` }, response => response.json());
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

	deleteRangeByIdAsync: async (ids: string[]) =>
		await httpDelete({ url: `${baseUrl}`, authenticate: true, body: ids }),

	updateAsync: async (product: IProduct) =>
		await httpPut({ url: baseUrl, body: product, authenticate: true, }),

	toFavoritesAsync: async (productId: string, value: boolean) => {
		const queryString = `?productId=${productId}&value=${value}`
		return await httpPost({
			url: `${baseUrl}/to-favorites${queryString}`, authenticate: true
		})
	}
};

export default productsApi;

