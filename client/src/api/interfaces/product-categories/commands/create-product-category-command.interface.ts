export interface ICreateProductCategoryCommand {
	name: string,
	title: string,
	order: number,
	parentId: number | null,
	iconName: string
}