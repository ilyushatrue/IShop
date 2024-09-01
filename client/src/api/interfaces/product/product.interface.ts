import { IIdentity } from "../../../app/infrastructure/unique.interface";

export interface IProduct extends IIdentity<string> {
	name: string;
	price: number;
	description: string;
	imageId: string;
	categoryId: number;
}
