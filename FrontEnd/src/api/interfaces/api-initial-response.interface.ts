import { IProductCategory } from "./product-categories/product-category.interface";
import { IUserInitial } from "./user/user-initial.interface";

export interface IApiInitialResponse {
	user: IUserInitial,
	productCategories: IProductCategory[]
}