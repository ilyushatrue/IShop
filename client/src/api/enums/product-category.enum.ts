export enum ProductCategoryEnum {
	Clothes,
	Electronics,
	Yard,
	ChildCare,
}

export const productCategoryEnumName: Record<ProductCategoryEnum, string> = {
	[ProductCategoryEnum.Clothes]: "Одежда",
	[ProductCategoryEnum.Electronics]: "Электроника",
	[ProductCategoryEnum.Yard]: "Дом и сад",
	[ProductCategoryEnum.ChildCare]: "Детские товары",
};
