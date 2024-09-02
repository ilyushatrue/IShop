import { useRef, useState } from "react";
import useApi from "../../../api/hooks/use-api.hook";
import productsApi from "../../../api/endpoints/products.api";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { reload } from "../../../app/helpers/reload";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import EnhancedTable from "../../../components/table/table";
import AccountPage from "../account-page";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";
import ConfirmDialog from "../../../components/confirm-dialog";
import FavoriteProductsTable from "./favorite-products-table";

export default function FavoriteProducts() {
	const [isDeleteDialogOn, setIsDeleteDialogOn] = useState(false);
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
			request: productsApi.createAsync(values),
			onSuccess: (handler) => handler.popup("Новый товар добавлен."),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		}).then(reload);
	}

	async function handleDeleteProductAsync(productIds: string[]) {
		fetchAsync({
			request: productsApi.deleteRangeByIdAsync(productIds),
			onSuccess: () =>
				setProducts((prev) =>
					prev.filter((x) => !productIds.includes(x.id))
				),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		});
	}
	const closeDeleteDialog = () => setIsDeleteDialogOn(false);
	const openDeleteDialog = () => setIsDeleteDialogOn(true);
	return (
		<AccountPage title="Избранное">
			<FavoriteProductsTable
				onDelete={console.log}
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
				open={isDeleteDialogOn}
				title="Удалить из избранного"
				content="Вы действительно хотите удалить выбранные товары?"
			/>
		</AccountPage>
	);
}
