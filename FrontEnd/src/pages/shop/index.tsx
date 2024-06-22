import Products from "./products";
import { IProduct } from "../../api/interfaces/product/product.interface";
import Page from "../../components/page";
import useApi from "../../api/hooks/use-api.hook";
import { useEffect, useState } from "react";
import productsApi from "../../api/products.api";
import { useNavigate } from "react-router-dom";

const myProducts: IProduct[] = [
	{
		name: "банан",
		description: "some banano",
		imageId: "banano.jpeg",
		price: 2000,
	},
	{
		name: "банан",
		description: "some banano",
		imageId: "berries.jpg",
		price: 2000,
	},
	{
		name: "жевачка",
		description: "some banano",
		imageId: "bubblegum.jpg",
		price: 2000,
	},
	{
		name: "конфеты",
		description: "some banano",
		imageId: "candy.jpg",
		price: 2000,
	},
	{
		name: "кофе",
		description: "some banano",
		imageId: "coffee.jpeg",
		price: 2000,
	},
	{
		name: "огурец",
		description: "some banano",
		imageId: "cucumber.jpeg",
		price: 2000,
	},
	{
		name: "мед",
		description: "some banano",
		imageId: "honey.jpeg",
		price: 2000,
	},
	{
		name: "мармелад",
		description: "some banano",
		imageId: "marmalade.jpeg",
		price: 2000,
	},
	{
		name: "картофель",
		description: "some banano",
		imageId: "potato.jpeg",
		price: 2000,
	},
	{
		name: "чай",
		description: "some banano",
		imageId: "tea.jpeg",
		price: 2000,
	},
	{
		name: "картофель",
		description: "some banano",
		imageId: "tomato.jpg",
		price: 2000,
	},
];

export default function Shop() {
	const { fetchAsync, isFetching } = useApi();
	const navigate = useNavigate();
	const [products, setProducts] = useState<IProduct[]>();

	useEffect(() => {
		fetchAsync({
			request: productsApi.getAllAsync,
			onSuccess: (handler) =>
				handler.do((res) => setProducts(res.body?.value)),
			onError: (handler) => handler.do(() => navigate("/not-found")),
		});
	}, []);

	if (!products) return null;

	return (
		<Page
			isLoading={isFetching}
			sx={{ mt: 2, bgcolor: "white", borderRadius: "24px", padding: 2 }}
		>
			<Products products={products!} />
		</Page>
	);
}
