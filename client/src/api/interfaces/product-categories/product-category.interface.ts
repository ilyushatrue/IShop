export interface IProductCategory {
	id: number,
	name: string,
	title: string,
	order: number,
	parentId: number | null
	iconName: string | null
	parent: IProductCategory | null
	children: IProductCategory[] 
}