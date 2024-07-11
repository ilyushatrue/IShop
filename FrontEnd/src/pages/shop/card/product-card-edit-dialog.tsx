import Dialog from "../../../components/dialog";
import Form from "../../../components/form/form";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { Box } from "@mui/material";
import { IProductCategory } from "../../../api/interfaces/product-categories/queries/product-category.interface";

export default function ProductCardEditDialog({
	open,
	loading,
	defaultValues,
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
		<Dialog open={open} actions={() => []} >
			<Box width={500}>
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
							onClick: onCancel,
							position: "left",
							label: "Отменить",
						},
						{
							...reset,
							position: "right",
							label: "Сбросить",
						},
						{
							...submit,
							label: "Сохранить",
						},
					]}
					minHeight={500}
					onSubmit={onSubmit}
				/>
			</Box>
		</Dialog>
	);
}
