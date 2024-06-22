import Products from "./products";
import { IProduct } from "../../api/interfaces/product/product.interface";
import Page from "../../components/page";

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
	return (
		<Page isLoading={false} sx={{mt:2, bgcolor:"white", borderRadius: "24px", padding: 2}}>
			<Products products={myProducts} />
		</Page>
	);
}
