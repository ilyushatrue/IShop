import { IIdentity } from "../../../app/infrastructure/unique.interface";

export interface IProductCategory extends IIdentity<number> {
	name: string;
	title: string;
	order: number;
	parentId: number | null;
	iconName: string | null;
	parent: IProductCategory | null;
	children: IProductCategory[];
}
