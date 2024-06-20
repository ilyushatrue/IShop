import Products from "./products";
import { IProduct } from "../../api/interfaces/product/product.interface";
import Page from "../../components/page";

const myProducts: IProduct[] = [
	{
		name: "банан",
		description: "some banano",
		imageUrl: "banano.jpeg",
		price: 2000,
	},
	{
		name: "банан",
		description: "some banano",
		imageUrl: "berries.jpg",
		price: 2000,
	},
	{
		name: "жевачка",
		description: "some banano",
		imageUrl: "bubblegum.jpg",
		price: 2000,
	},
	{
		name: "конфеты",
		description: "some banano",
		imageUrl: "candy.jpg",
		price: 2000,
	},
	{
		name: "кофе",
		description: "some banano",
		imageUrl: "coffee.jpeg",
		price: 2000,
	},
	{
		name: "огурец",
		description: "some banano",
		imageUrl: "cucumber.jpeg",
		price: 2000,
	},
	{
		name: "мед",
		description: "some banano",
		imageUrl: "honey.jpeg",
		price: 2000,
	},
	{
		name: "мармелад",
		description: "some banano",
		imageUrl: "marmalade.jpeg",
		price: 2000,
	},
	{
		name: "картофель",
		description: "some banano",
		imageUrl: "potato.jpeg",
		price: 2000,
	},
	{
		name: "чай",
		description: "some banano",
		imageUrl: "tea.jpeg",
		price: 2000,
	},
	{
		name: "картофель",
		description: "some banano",
		imageUrl: "tomato.jpg",
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
