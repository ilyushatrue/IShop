import { IProductCategory } from "../api/interfaces/product/categories/product-category.interface";
import { IUser } from "../api/interfaces/user/user.interface";

export interface IUserState {
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	phone: string | null;
	avatarId: string | null,
	isAuthenticated: boolean
}

export interface IGlobalState {
	productCategories: IProductCategory[]
}

export type IApiInitialResponse = {
	user: IUser | null
	productCategories: IProductCategory[],
}