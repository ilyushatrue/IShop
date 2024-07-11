import { useNavigate } from "react-router-dom";
import useApi from "../../../api/hooks/use-api.hook";
import productsApi from "../../../api/endpoints/products.api";
import Form from "../../../components/form/form";
import ProfilePage from "../profile-page";
import { Box } from "@mui/material";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";

export default function ProductAdd() {
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
	async function handleSubmitAsync(values: ICreateProductCommand) {
		await fetchAsync({
			request: async () => await productsApi.createAsync(values),
			onSuccess: (handler) =>
				handler
					.popup("Новый товар добавлен.")
					.do(() => navigate("/products/menu")),
			onError: (handler) => handler.log().popup(),
		});
	}
	if (!categories) return null;
	return (
		<ProfilePage mainBoxProps={{ padding: 2 }}>
			<Box width={500} marginX={"auto"}>
				<Form
					loading={isFetching}
					defaultValues={defaultValues}
					actions={([submit]) => [
						{
							...submit,
							position: "center",
							label: "Добавить товар",
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
									value: c.name,
								})),
								name: "categoryId",
								label: "Категория",
								required: true,
							})
					}
					minHeight={500}
					onSubmit={handleSubmitAsync}
				/>
			</Box>
		</ProfilePage>
	);
}
