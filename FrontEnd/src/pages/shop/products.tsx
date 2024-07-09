import { Box, BoxProps, Grid } from "@mui/material";
import { IProduct } from "../../api/interfaces/product/product.interface";
import { useMemo, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import ProductCard, { ICardAction } from "./card/product-card";
import Dialog from "../../components/dialog";
import productsApi from "../../api/products.api";
import ProductCardEditDialog from "./card/product-card-edit-dialog";

interface IProps extends BoxProps {
	products: IProduct[];
}
export default function Products({ products, ...props }: IProps) {
	const [productToDeleteId, setProductToDeleteId] = useState("");
	const [productToEdit, setProductToEdit] = useState<IProduct>();
	const isAuth = useAppSelector((state) => state.user.isAuthenticated);
	const categories = useAppSelector(
		(state) => state.global.productCategories
	);
	const { fetchAsync, isFetching } = useApi();
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
	}, [isAuth]);



	return (
		<Box {...props} display={"flex"} justifyContent={"center"}>
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
			<Dialog
				title="Удалить товар"
				content="Вы действительно хотите удалить товар?"
				open={!!productToDeleteId}
				onAccept={() => {
					const id = productToDeleteId;
					setProductToDeleteId("");
					fetchAsync({
						request: () => productsApi.deleteByIdAsync(id),
						onError: (handler) => handler.log().popup(),
					});
				}}
				onCancel={() => setProductToDeleteId("")}
			/>
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
		</Box>
	);
}
