import { Box, Grid } from "@mui/material";
import { IProduct } from "../../api/interfaces/product/product.interface";
import { useMemo, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import ProductCard from "./card/product-card";
import ProductCardEditDialog from "./card/product-card-edit-dialog";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { setFavoriteProduct } from "../../store/user.slice";
import { redirect } from "../../app/helpers/redirect";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";
import ConfirmDialog from "../../components/dialogs/confirm-dialog";
import ProductsApi from "../../api/endpoints/products.api";

interface IProps {
	products: IProduct[];
	onUpdate: (product: IProduct) => void;
	onDelete: (productId: string) => void;
}
export default function Products({ products, onDelete, onUpdate }: IProps) {
	const [productToDeleteId, setProductToDeleteId] = useState("");
	const [productToEdit, setProductToEdit] = useState<IProduct>();
	const { xs } = useMediaQueryContext();
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
					) as IProduct[];
					return products.filter((p) =>
						favorites.some((f) => f.id === p.id)
					);
				}
				return [];
			}
		},
		[apiFavoriteProducts, isAuth, products]
	);

	const { fetchAsync, isFetching } = useApi();

	async function handleDeleteProductAsync() {
		const id = productToDeleteId;
		setProductToDeleteId("");
		fetchAsync({
			request: ProductsApi.deleteByIdAsync(id),
			onSuccess: () => onDelete(id),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		}).catch(Boolean);
	}

	async function handleToFavoritesAsync(productId: string, value: boolean) {
		if (isAuth) {
			await fetchAsync({
				request: ProductsApi.toFavoritesAsync(productId, value),
				onSuccess: () =>
					dispatch(
						setFavoriteProduct({
							product: products.find((p) => p.id === productId)!,
							value: value,
						})
					),
				onError: (handler) => handler.log().popup(),
			}).catch(Boolean);
		} else {
			let favoritesFromLocalStorage =
				window.localStorage.getItem("favorite-products");
			if (favoritesFromLocalStorage) {
				let favorites = JSON.parse(
					favoritesFromLocalStorage
				) as IProduct[];
				if (value) {
					favorites.push(products.find((x) => x.id === productId)!);
				} else {
					favorites = favorites.filter((sf) => sf.id !== productId);
				}
				window.localStorage.setItem(
					"favorite-products",
					JSON.stringify(
						products.filter((x) =>
							favorites.some((f) => f.id === x.id)
						)
					)
				);
			} else {
				window.localStorage.setItem(
					"favorite-products",
					JSON.stringify(products.filter((x) => x.id === productId))
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
			request: ProductsApi.updateAsync(product),
			onSuccess: (handler) => handler.popup("Данные сохранены"),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then(() => {
				onUpdate(product);
			})
			.catch(Boolean);
	}

	return (
		<Box>
			<Grid
				container
				rowSpacing={4}
				width={"100%"}
				height={"100%"}
			>
				{products.map((p, index) => {
					const isFavorite = userFavoriteProducts.some(
						(ufp) => ufp.id === p.id
					);

					return (
						<Grid item xs={6} md={4} lg={3} key={index}>
							<ProductCard
								onFavoriteClick={handleToFavoritesAsync}
								onClick={(id) =>
									redirect(`/product/${id}`, true)
								}
								favorite={isFavorite}
								id={p.id}
								price={p.price}
								imageId={p.imageId}
								description={p.description}
								name={p.name}
							/>
						</Grid>
					);
				})}
			</Grid>
			<ConfirmDialog
				open={!!productToDeleteId}
				onClose={() => setProductToDeleteId("")}
				confirmText="Удалить"
				content="Вы действительно хотите удалить товар?"
				onConfirm={handleDeleteProductAsync}
			/>
			<ProductCardEditDialog
				categories={categories}
				defaultValues={productToEdit!}
				loading={isFetching}
				onSubmit={handleEditProductAsync}
				open={!!productToEdit}
				onCancel={() => setProductToEdit(undefined)}
			/>
		</Box>
	);
}
