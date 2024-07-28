import Form from "../../../components/form/form";
import { Box, Dialog } from "@mui/material";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";

export default function ProductAddDialog({
	categoryId,
	open,
	onClose,
	onSubmit,
	loading,
}: {
	categoryId: number;
	loading: boolean;
	open: boolean;
	onClose: () => void;
	onSubmit: (values: ICreateProductCommand) => void;
}) {
	const categories = useAppSelector(
		(state) => state.global.productCategories
	);
	const defaultValues = useMemo<ICreateProductCommand>(
		() => ({
			description: "",
			imageId: "",
			name: "",
			categoryId: categoryId,
			price: 0,
		}),
		[categoryId]
	);

	if (!categories) return null;
	return (
		<Dialog open={open} onClose={onClose}>
			<Box width={500} marginX={"auto"} sx={{ paddingX: 2 }}>
				<Form
					loading={loading}
					defaultValues={defaultValues}
					actions={([submit]) => [
						{
							...submit,
							position: "center",
							value: "Добавить товар",
						},
					]}
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
								min: 1,
							})
					}
					minHeight={500}
					onSubmit={onSubmit}
				/>
			</Box>
		</Dialog>
	);
}
