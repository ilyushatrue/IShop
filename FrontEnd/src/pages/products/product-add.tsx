import { useNavigate } from "react-router-dom";
import useApi from "../../api/hooks/use-api.hook";
import { IProduct } from "../../api/interfaces/product/product.interface";
import productsApi from "../../api/products.api";
import Form from "../../components/form/form";
import ProfilePage from "../profile-page";

export default function ProductAdd() {
	const { fetchAsync, isFetching } = useApi();
	const navigate = useNavigate();
	async function handleSubmitAsync(values: IProduct) {
		await fetchAsync({
			request: async () => await productsApi.createAsync(values),
			onSuccess: (handler) =>
				handler
					.popup("Новый товар добавлен.")
					.do(() => navigate("/products/menu")),
			onError: (handler) => handler.log().popup(),
		});
	}

	return (
		<ProfilePage>
			<Form<IProduct>
				defaultValues={{
					description: "",
					imageId: "",
					name: "",
					price: 0,
				}}
				fields={(builder) =>
					builder
						.image({
							name: "imageId",
							required: true,
							shape: "rounded",
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
				}
				minHeight={500}
				onSubmit={handleSubmitAsync}
			/>
		</ProfilePage>
	);
}
