import { IMenuItem } from "../menu-items/menu-item.interface";
import { IProduct } from "../product/product.interface";

export interface IUserInitial {
	firstName: string;
	lastName: string;
	email: string;
	phone: string | null;
	avatarId: string | null
	menuItems: IMenuItem[]
	favoriteProducts: IProduct[]
}
