import { Box, BoxProps, Grid } from "@mui/material";
import { IProduct } from "../../api/interfaces/product/product.interface";
import getConstant from "../../app/infrastructure/constant-provider";
import { useMemo, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import ProductCard, { ICardAction } from "./product-card";
import Dialog from "../../components/dialog";
import productsApi from "../../api/products.api";

interface IProps extends BoxProps {
	products: IProduct[];
}
export default function Products({ products, ...props }: IProps) {
	const [isDeleteConfirm, setIsDeleteConfirm] = useState("");

	const isAuth = useAppSelector((state) => state.user.isAuthenticated);
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
					onClick: console.log,
				},
				{
					iconName: "delete_outline",
					onClick: setIsDeleteConfirm,
				},
			]);
		}
		return actions;
	}, [isAuth]);

	console.log(isDeleteConfirm)
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
				open={!!isDeleteConfirm}
				onAccept={() => {
					const id = isDeleteConfirm;
					setIsDeleteConfirm("");
					fetchAsync({
						request: () => productsApi.deleteByIdAsync(id),
					});
				}}
				onCancel={() => setIsDeleteConfirm("")}
			/>
		</Box>
	);
}
