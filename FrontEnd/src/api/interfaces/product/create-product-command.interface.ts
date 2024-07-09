export interface ICreateProductCommand {
	description: string;
	imageId: string;
	name: string;
	categoryId: number | null;
	price: number;
}