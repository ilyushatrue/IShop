import { useRef, useState } from "react";
import useApi from "../../../api/hooks/use-api.hook";
import ProfilePage from "../profile-page";
import productsApi from "../../../api/endpoints/products.api";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { reload } from "../../../app/helpers/reload";
import Dialog from "../../../components/dialog";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import EnhancedTable from "../../../components/table/table";

export default function FavoriteProducts() {
	const [isDeleteDialogOn, setIsDeleteDialogOn] = useState(false);
	const { fetchAsync } = useApi({ triggerPage: true });
	const [products, setProducts] = useState<IProduct[]>(
		useAppSelector((state) => state.user.favoriteProducts)
	);
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
			request: async () => await productsApi.createAsync(values),
			onSuccess: (handler) =>
				handler.popup("Новый товар добавлен.").do(reload),
			onError: (handler) => handler.log().popup(),
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
			request: () => productsApi.deleteRangeByIdAsync(productIds),
			onSuccess: () =>
				setProducts((prev) =>
					prev.filter((x) => !productIds.includes(x.id))
				),
			onError: (handler) => handler.log().popup(),
		});
	}
	const closeDeleteDialog = () => setIsDeleteDialogOn(false);
	const openDeleteDialog = () => setIsDeleteDialogOn(true);
	return (
		<ProfilePage title="Избранное">
			<EnhancedTable
				onSelect={(ids) => (selectedIds.current = ids)}
				rowsPerPage={rowsPerPage}
				rows={products}
				title={"Избранные товары"}
				rowsPerPageOptions={rowsPerPageOptions}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				page={page}
				actions={([del, add, filter]) => [
					{
						...del,
						componentProps: {
							...filter.componentProps,
							onClick: openDeleteDialog,
						},
					},
					{
						...add,
						componentProps: {
							...filter.componentProps,
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
				onOk={() => handleDeleteProductAsync(selectedIds.current)}
				actions={([ok]) => [
					{
						value: "Не хочу",
						position: "left",
						onClick: closeDeleteDialog,
					},
					{
						...ok,
						value: "Хочу!",
					},
				]}
			/>
		</ProfilePage>
	);
}
