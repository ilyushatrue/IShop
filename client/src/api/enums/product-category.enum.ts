export enum ProductCategoryEnum {
	Clothes = 1,
	Electronics,
	Yard,
	ChildCare,
}

export const productCategoryEnumName: Record<ProductCategoryEnum, string> = {
	[ProductCategoryEnum.Clothes]: "Одежда и обувь",
	[ProductCategoryEnum.Electronics]: "Электроника",
	[ProductCategoryEnum.Yard]: "Дом и сад",
	[ProductCategoryEnum.ChildCare]: "Детские товары",
};
export const productCategoryEnumLink: Record<ProductCategoryEnum, string> = {
	[ProductCategoryEnum.Clothes]: "clothes",
	[ProductCategoryEnum.Electronics]: "electronics",
	[ProductCategoryEnum.Yard]: "yard",
	[ProductCategoryEnum.ChildCare]: "child-care",
};
