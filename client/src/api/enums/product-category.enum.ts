export enum ProductCategoryEnum {
	Clothes,
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
