import { IMenuItem } from "../api/interfaces/menu-items/menu-item.interface";
import { IProductCategory } from "../api/interfaces/product-categories/product-category.interface";
import { IProduct } from "../api/interfaces/product/product.interface";

export interface IUserState {
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	phone: string | null;
	avatarId: string | null;
	isAuthenticated: boolean;
	favoriteProducts: IProduct[];
}

export interface IGlobalState {
	productCategories: IProductCategory[];
	menuItems: IMenuItem[];
	searchValue: string;
}
