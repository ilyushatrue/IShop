import { ICreateProductCategoryCommand } from "../interfaces/product-categories/commands/create-product-category-command.interface";
import { IProductCategory } from "../interfaces/product-categories/product-category.interface";
import { ICreateProductCommand } from "../interfaces/product/commands/create-product-command.interface";
import { IProduct } from "../interfaces/product/product.interface";
import { IPager } from "../interfaces/pager.interface";
import BaseApi from "../base-api";
import StrictApi from "../strict-api";

const baseUrl = "/products";

export default class ProductsApi {
	public static async getByIdAsync(id: string) {
		return await BaseApi.httpGet<IProduct>(
			{ url: `${baseUrl}/${id}` },
			(response) => response.json()
		);
	}

	public static async getAllAsync(
		page: number,
		pageSize: number,
		search?: string
	) {
		const queryString = `?page=${page}&pageSize=${pageSize}&search=${search}`;
		return await BaseApi.httpGet<IPager<IProduct>>(
			{ url: baseUrl + queryString },
			(response) => response.json()
		);
	}

	public static async getFilteredAsync({
		page,
		pageSize,
		categoryId,
		search,
		maxPrice,
		minPrice,
	}: {
		page: number;
		pageSize: number;
		categoryId?: number;
		search?: string;
		minPrice?: number;
		maxPrice?: number;
	}) {
		const queryString = new URLSearchParams({
			page: String(page),
			pageSize: String(pageSize),
			...(categoryId && { categoryId: String(categoryId) }),
			...(search && { search: String(search) }),
			...(minPrice && { minPrice: String(minPrice) }),
			...(maxPrice && { maxPrice: String(maxPrice) }),
		}).toString();

		return await BaseApi.httpGet<IPager<IProduct>>(
			{ url: `${baseUrl}/filtered?${queryString}` },
			(response) => response.json()
		);
	}

	public static async getAllCategories() {
		return await BaseApi.httpGet<IProductCategory[]>(
			{ url: `${baseUrl}/categories` },
			(response) => response.json()
		);
	}

	public static async createAsync(product: ICreateProductCommand) {
		return await StrictApi.httpPost({
			url: baseUrl,
			body: product,
		});
	}

	public static async createCategoryAsync(
		category: ICreateProductCategoryCommand
	) {
		return await StrictApi.httpPost({
			url: `${baseUrl}/categories`,
			body: category,
		});
	}

	public static async syncCategoriesAsync(categories: IProductCategory[]) {
		return await StrictApi.httpPut({
			url: `${baseUrl}/categories`,
			body: categories,
		});
	}

	public static async deleteByIdAsync(id: string) {
		return await StrictApi.httpDelete({
			url: `${baseUrl}/${id}`,
		});
	}

	public static async deleteRangeByIdAsync(ids: string[]) {
		return await StrictApi.httpDelete({
			url: `${baseUrl}`,
			body: ids,
		});
	}

	public static async updateAsync(product: IProduct) {
		return await StrictApi.httpPut({
			url: baseUrl,
			body: product,
		});
	}

	public static async toFavoritesAsync(productId: string, value: boolean) {
		const queryString = `?productId=${productId}&value=${value}`;
		return await StrictApi.httpPost({
			url: `${baseUrl}/to-favorites${queryString}`,
		});
	}

	public static async toFavoritesRangeAsync(
		array: { productId: string; value: boolean }[]
	) {
		return await StrictApi.httpPost({
			url: `${baseUrl}/to-favorites-range`,
			body: array,
		});
	}

	public static async addToCartAsync(id: string) {
		return await StrictApi.httpPost({
			url: `${baseUrl}/add-to-cart/${id}`,
		});
	}
}
