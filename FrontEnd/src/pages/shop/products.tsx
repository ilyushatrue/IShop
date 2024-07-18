import { Grid } from "@mui/material";
import { IProduct } from "../../api/interfaces/product/product.interface";
import { useMemo, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import ProductCard from "./card/product-card";
import Dialog from "../../components/dialog";
import ProductCardEditDialog from "./card/product-card-edit-dialog";
import productsApi from "../../api/endpoints/products.api";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { setFavoriteProduct } from "../../store/user.slice";

interface IProps {
	products: IProduct[];
	onUpdate: (product: IProduct) => void;
	onDelete: (productId: string) => void;
}
export default function Products({ products, onDelete, onUpdate }: IProps) {
	const [productToDeleteId, setProductToDeleteId] = useState("");
	const [productToEdit, setProductToEdit] = useState<IProduct>();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state) => state.user.isAuthenticated);
	const categories = useAppSelector(
		(state) => state.global.productCategories
	);
	const apiFavoriteProducts = useAppSelector(
		(state) => state.user.favoriteProducts
	);
	const userFavoriteProducts: IProduct[] = useMemo(
		function () {
			if (isAuth) {
				return apiFavoriteProducts;
			} else {
				let favoritesFromLocalStorage =
					window.localStorage.getItem("favorite-products");
				if (favoritesFromLocalStorage) {
					const favorites = JSON.parse(
						favoritesFromLocalStorage
					) as string[];
					return products.filter((p) => favorites.includes(p.id));
				}
				return [];
			}
		},
		[apiFavoriteProducts, isAuth, products]
	);

	const { fetchAsync, isFetching } = useApi({ triggerPage: true });
	const { fetchAsync: fastFetch } = useApi({ triggerPage: false });

	async function handleDeleteProductAsync() {
		const id = productToDeleteId;
		setProductToDeleteId("");
		fetchAsync({
			request: () => productsApi.deleteByIdAsync(id),
			onSuccess: () => onDelete(id),
			onError: (handler) => handler.log().popup(),
		});
	}

	async function handleToFavoritesAsync(productId: string, value: boolean) {
		if (isAuth) {
			await fastFetch({
				request: () => productsApi.toFavoritesAsync(productId, value),
				onSuccess: () =>
					dispatch(
						setFavoriteProduct({
							product: products.find((p) => p.id === productId)!,
							value: value,
						})
					),
				onError: (handler) => handler.log().popup(),
			});
		} else {
			let favoritesFromLocalStorage =
				window.localStorage.getItem("favorite-products");
			if (favoritesFromLocalStorage) {
				let favorites = JSON.parse(
					favoritesFromLocalStorage
				) as string[];
				if (value) {
					favorites.push(productId);
				} else {
					favorites = favorites.filter((sf) => sf !== productId);
				}
				window.localStorage.setItem(
					"favorite-products",
					JSON.stringify(favorites)
				);
			} else {
				window.localStorage.setItem(
					"favorite-products",
					JSON.stringify([productId])
				);
			}
			dispatch(
				setFavoriteProduct({
					product: products.find((p) => p.id === productId)!,
					value: value,
				})
			);
		}
	}

	async function handleEditProductAsync(product: IProduct) {
		setProductToEdit(undefined);
		fetchAsync({
			request: () => productsApi.updateAsync(product),
			onSuccess: () => onUpdate(product),
			onError: (handler) => handler.log().popup(),
		});
	}

	return (
		<>
			<Grid container rowSpacing={4} width={"100%"} height={"100%"}>
				{products.map((p, index) => {
					console.log(userFavoriteProducts);
					const isFavorite = userFavoriteProducts.some(
						(ufp) => ufp.id === p.id
					);

					return (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<ProductCard
								onFavoriteClick={handleToFavoritesAsync}
								onClick={console.log}
								favorite={isFavorite}
								id={p.id}
								imageId={p.imageId}
								description={p.description}
								name={p.name}
							/>
						</Grid>
					);
				})}
			</Grid>
			<Dialog
				title="Удалить товар"
				onEnterKeyPress={handleDeleteProductAsync}
				content="Вы действительно хотите удалить товар?"
				open={!!productToDeleteId}
				onClose={() => setProductToDeleteId("")}
				onOk={handleDeleteProductAsync}
				actions={([ok]) => [
					{
						value: "Не хочу",
						position: "left",
						onClick: () => setProductToDeleteId(""),
					},
					{
						...ok,
						value: "Хочу!",
					},
				]}
			/>
			<ProductCardEditDialog
				categories={categories}
				defaultValues={productToEdit!}
				loading={isFetching}
				onSubmit={handleEditProductAsync}
				open={!!productToEdit}
				onCancel={() => setProductToEdit(undefined)}
			/>
		</>
	);
}
