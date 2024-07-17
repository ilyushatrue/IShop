import Form from "../../../components/form/form";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { Box, Dialog } from "@mui/material";
import { IProductCategory } from "../../../api/interfaces/product-categories/product-category.interface";

export default function ProductCardEditDialog({
	open,
	loading,
	defaultValues = {
		categoryId: 0,
		description: "",
		id: "",
		imageId: "",
		name: "",
		price: 0,
	},
	categories,
	onSubmit,
	onCancel,
}: {
	open: boolean;
	loading: boolean;
	categories: IProductCategory[];
	defaultValues: IProduct;
	onSubmit: (product: IProduct) => void;
	onCancel: () => void;
}) {
	return (
		<Dialog open={open} onClose={onCancel}>
			<Box width={"100%"} minWidth={400} maxWidth={500} paddingX={2}>
				<Form<IProduct>
					loading={loading}
					defaultValues={defaultValues}
					fields={(builder) =>
						builder
							.image({
								name: "imageId",
								required: true,
								shape: "rounded",
								containerSized: true,
							})
							.text({
								name: "name",
								label: "Наименование",
								required: true,
							})
							.text({
								name: "description",
								label: "Описание",
								required: true,
							})
							.number({
								name: "price",
								label: "Цена",
								required: true,
								min: 0,
							})
							.select({
								options: categories.map((c) => ({
									key: c.id,
									value: c.name,
								})),
								name: "categoryId",
								label: "Категория",
								required: true,
							})
					}
					actions={([submit, reset]) => [
						{
							onClick: () => {
								console.log(23);
								onCancel();
							},
							position: "left",
							value: "Отменить",
						},
						{
							...reset,
							position: "right",
							value: "Сбросить",
						},
						{
							...submit,
							value: "Сохранить",
						},
					]}
					minHeight={500}
					onSubmit={onSubmit}
				/>
			</Box>
		</Dialog>
	);
}
