import { useNavigate } from "react-router-dom";
import useApi from "../../../api/hooks/use-api.hook";
import productsApi from "../../../api/endpoints/products.api";
import Form from "../../../components/form/form";
import { Box, Dialog } from "@mui/material";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";

export default function ProductAddDialog({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: ICreateProductCommand) => void;
}) {
	const { fetchAsync, isFetching } = useApi({ triggerPage: true });
	const categories = useAppSelector(
		(state) => state.global.productCategories
	);
	const navigate = useNavigate();
	const defaultValues = useMemo<ICreateProductCommand>(
		() => ({
			description: "",
			imageId: "",
			name: "",
			categoryId: null,
			price: 0,
		}),
		[]
	);
	
	if (!categories) return null;
	return (
		<Dialog open={open} onClose={onClose}>
			<Box width={500} marginX={"auto"} sx={{paddingX:2}}>
				<Form
					loading={isFetching}
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
								min: 0,
							})
							.select({
								options: categories.map((c) => ({
									key: c.id,
									value: c.title,
								})),
								name: "categoryId",
								label: "Категория",
								required: true,
							})
					}
					minHeight={500}
					onSubmit={onSubmit}
				/>
			</Box>
		</Dialog>
	);
}
