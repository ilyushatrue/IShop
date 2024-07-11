import { Grid } from "@mui/material";
import { IProduct } from "../../api/interfaces/product/product.interface";
import { useMemo, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import ProductCard, { ICardAction } from "./card/product-card";
import Dialog from "../../components/dialog";
import ProductCardEditDialog from "./card/product-card-edit-dialog";
import productsApi from "../../api/products.api";

interface IProps {
	products: IProduct[];
	onDelete: (productId: string) => void;
}
export default function Products({ products, onDelete }: IProps) {
	const [productToDeleteId, setProductToDeleteId] = useState("");
	const [productToEdit, setProductToEdit] = useState<IProduct>();
	const isAuth = useAppSelector((state) => state.user.isAuthenticated);
	const categories = useAppSelector(
		(state) => state.global.productCategories
	);
	const { fetchAsync, isFetching } = useApi({ triggerPage: true });
	const cardActions: ICardAction[] = useMemo(() => {
		let actions: ICardAction[] = [
			{
				iconName: "favorite_outline",
				onClick: (id) => console.log(id),
			},
		];
		if (isAuth) {
			actions = actions.concat([
				{
					iconName: "edit",
					onClick: (id) =>
						setProductToEdit(products.find((p) => p.id === id)),
				},
				{
					iconName: "delete_outline",
					onClick: setProductToDeleteId,
				},
			]);
		}
		return actions;
	}, [isAuth, products]);

	async function handleDeleteProductAsync() {
		const id = productToDeleteId;
		setProductToDeleteId("");
		fetchAsync({
			request: () => productsApi.deleteByIdAsync(id),
			onSuccess: () => onDelete(id),
			onError: (handler) => handler.log().popup(),
		});
	}
	console.log(productToDeleteId);
	return (
		<>
			<Grid container rowSpacing={4} width={"100%"} height={"100%"}>
				{products.map((p, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<ProductCard
							id={p.id}
							imageId={p.imageId}
							actions={cardActions}
							description={p.description}
							name={p.name}
						/>
					</Grid>
				))}
			</Grid>
			{!!productToDeleteId && (
				<Dialog
					title="Удалить товар"
					content="Вы действительно хотите удалить товар?"
					open={!!productToDeleteId}
					onClose={() => setProductToDeleteId("")}
					onOk={handleDeleteProductAsync}
					actions={([ok]) => [
						{
							label: "Не хочу",
							position: "left",
							onClick: () => setProductToDeleteId(""),
						},
						{
							...ok,
							label: "Хочу!",
						},
					]}
				/>
			)}
			{productToEdit && (
				<ProductCardEditDialog
					categories={categories}
					defaultValues={productToEdit!}
					loading={isFetching}
					onSubmit={console.log}
					open={!!productToEdit}
					onCancel={() => setProductToEdit(undefined)}
				/>
			)}
		</>
	);
}
