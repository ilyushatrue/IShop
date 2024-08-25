import { useMemo, useRef, useState } from "react";
import useApi from "../../../api/hooks/use-api.hook";
import productsApi from "../../../api/endpoints/products.api";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { reload } from "../../../app/helpers/reload";
import Dialog from "../../../components/dialog";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import EnhancedTable from "../../../components/table/table";
import AccountPage from "../account-page";
import OutlinedButton from "../../../components/buttons/outlined-button";

export default function FavoriteProducts() {
	const [isDeleteDialogOn, setIsDeleteDialogOn] = useState(false);
	const isAuth = useAppSelector((state) => state.user.isAuthenticated);
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
	const rowsPerPageOptions = [10, 25, 100];
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [page, setPage] = useState(0);
	const selectedIds = useRef<string[]>([]);
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
			request:  productsApi.createAsync(values),
			onSuccess: (handler) =>
				handler.popup("Новый товар добавлен.").do(reload),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		});
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};
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
			<EnhancedTable
				onSelect={(ids) => (selectedIds.current = ids)}
				rowsPerPage={rowsPerPage}
				rows={products}
				loading={isFetching}
				title={"Избранные товары"}
				rowsPerPageOptions={rowsPerPageOptions}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				page={page}
				actions={([del, add, filter]) => [
					{
						...del,
						componentProps: {
							...del.componentProps,
							onClick: openDeleteDialog,
						},
					},
					{
						...add,
						componentProps: {
							...add.componentProps,
							onClick: openAddProductDialog,
						},
					},
					{
						...filter,
						componentProps: {
							...filter.componentProps,
							onClick: () => console.log(selectedIds.current),
						},
					},
				]}
			/>
			<Dialog
				title="Удалить товары"
				onEnterKeyPress={() =>
					handleDeleteProductAsync(selectedIds.current)
				}
				content="Вы действительно хотите удалить выбранные товары?"
				open={isDeleteDialogOn}
				onClose={closeDeleteDialog}
				actions={() => [
					{
						value: "Не хочу",
						position: "left",
						component: OutlinedButton,
						componentProps: {
							onClick: closeDeleteDialog,
							fullWidth: true,
						},
					},
					{
						value: "Хочу!",
						componentProps: {
							onClick: () =>
								handleDeleteProductAsync(selectedIds.current),
							fullWidth: true,
						},
					},
				]}
			/>
		</AccountPage>
	);
}
