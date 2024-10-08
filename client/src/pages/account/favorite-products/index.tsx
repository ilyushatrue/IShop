import { useState } from "react";
import useApi from "../../../api/hooks/use-api.hook";
import ProductsApi from "../../../api/endpoints/products.api";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { reload } from "../../../app/helpers/reload";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import AccountPage from "../account-page";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";
import ConfirmDialog from "../../../components/dialogs/confirm-dialog";
import FavoriteProductsTable from "./favorite-products-table";
import AccountPageSideBox from "../account-page-side-box";
import AccountPageMainBox from "../account-page-main-box";
import AccountPageMainBoxHeader from "../account-page-main-box-header";

export default function FavoriteProducts() {
	const [deleteDialogProps, setDeleteDialogProps] = useState<{
		isOn: boolean;
		products: IProduct[];
	}>({ isOn: false, products: [] });
	const isAuth = useAppSelector((state) => state.user.isAuthenticated);
	const { xs } = useMediaQueryContext();
	const apiFavoriteProducts = useAppSelector(
		(state) => state.user.favoriteProducts
	);
	const [products, setProducts] = useState<IProduct[]>(function () {
		if (isAuth) {
			return apiFavoriteProducts;
		} else {
			const favoritesFromLocalStorage =
				window.localStorage.getItem("favorite-products");
			if (favoritesFromLocalStorage) {
				return JSON.parse(favoritesFromLocalStorage) as IProduct[];
			}
		}
		return [];
	});
	const { fetchAsync, isFetching } = useApi();
	const [selectedItems, setSelectedItems] = useState<IProduct[]>([]);
	const [isAddProductDialogOn, setIsAddProductDialogOn] = useState(false);

	function closeAddProductDialog() {
		setIsAddProductDialogOn(false);
	}

	function openAddProductDialog() {
		setIsAddProductDialogOn(true);
	}

	async function handleSubmitAsync(values: ICreateProductCommand) {
		closeAddProductDialog();
		await fetchAsync({
			request: ProductsApi.createAsync(values),
			onSuccess: (handler) => handler.popup("Новый товар добавлен."),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then(reload)
			.catch(() => {});
	}

	async function handleDeleteProductAsync(productIds: string[]) {
		closeDeleteDialog();
		fetchAsync({
			request: ProductsApi.toFavoritesRangeAsync(
				productIds.map((p) => ({ productId: p, value: false }))
			),
			onSuccess: () =>
				setProducts((prev) =>
					prev.filter((x) => !productIds.includes(x.id))
				),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		}).catch(() => {});
	}

	const closeDeleteDialog = () =>
		setDeleteDialogProps((prev) => ({ ...prev, isOn: false }));

	const openDeleteDialog = (products: IProduct[]) =>
		setDeleteDialogProps({ isOn: true, products });

	return (
		<AccountPage>
			<AccountPageSideBox />
			<AccountPageMainBox>
				<AccountPageMainBoxHeader>Избранное</AccountPageMainBoxHeader>
				<FavoriteProductsTable
					onDelete={openDeleteDialog}
					loading={isFetching}
					rows={products}
					onChange={(values) =>
						setSelectedItems(
							values.map((v) => ({
								categoryId: 0,
								description: v.description,
								id: v.id,
								imageId: v.imageId,
								name: v.name,
								price: 0,
							}))
						)
					}
				/>

				<ConfirmDialog
					onConfirm={() =>
						handleDeleteProductAsync(selectedItems.map((s) => s.id))
					}
					onClose={closeDeleteDialog}
					open={deleteDialogProps.isOn}
					title="Удалить из избранного"
					content="Вы действительно хотите удалить выбранные товары?"
				/>
			</AccountPageMainBox>
		</AccountPage>
	);
}
