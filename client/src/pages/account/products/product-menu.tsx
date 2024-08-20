import { useEffect, useMemo, useRef, useState } from "react";
import useApi from "../../../api/hooks/use-api.hook";
import { Box } from "@mui/material";
import productsApi from "../../../api/endpoints/products.api";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import { IProductCategory } from "../../../api/interfaces/product-categories/product-category.interface";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import ProductAddDialog from "./product-add-dialog";
import EnhancedTable from "../../../components/table/table";
import IconButton from "../../../components/buttons/icon-button";
import Dialog from "../../../components/dialog";
import AccountPage from "../account-page";
import { reload } from "../../../app/helpers/reload";

export default function ProductMenu() {
	const [isDeleteDialogOn, setIsDeleteDialogOn] = useState(false);
	const { isFetching, fetchAsync } = useApi({ triggerPage: true });
	const [products, setProducts] = useState<IProduct[]>([]);
	const rowsPerPageOptions = [10, 25, 100];
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [page, setPage] = useState(0);
	const selectedIds = useRef<string[]>([]);
	const [isAddProductDialogOn, setIsAddProductDialogOn] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const appcategories = useAppSelector(
		(state) => state.global.productCategories
	);

	const categoryId = useMemo(() => {
		const parts = location.pathname.split("/").filter((part) => part);
		const categories = parts.slice(2);
		if (!categories.length) return 0;
		let curr: IProductCategory[] = appcategories;
		let item: IProductCategory;
		if (categories[0] === "add") return 0;

		const getresult = (
			cat: string,
			categories: IProductCategory[]
		): IProductCategory => {
			return categories.find((x) => x.name === cat)!;
		};
		categories.forEach((category) => {
			item = getresult(category, curr);
			curr = item.children;
		});
		return item!.id;
	}, [appcategories, location.pathname]);

	useEffect(() => {
		fetchAsync({
			request: () =>
				categoryId
					? productsApi.getByCategoryAsync(
							categoryId,
							page,
							rowsPerPage
					  )
					: productsApi.getAllAsync(page, rowsPerPage),
			onSuccess: (handler) =>
				handler.do((res) => setProducts(res.body!.pageItems!)),
			onError: (handler) => handler.log().popup(),
		});
	}, []);

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
		<AccountPage title={"Продукты"}>
			<Box height={50} mt={1} ml={1}>
				<IconButton
					disabled={isFetching}
					color="secondary.light"
					variant="rounded"
					iconName="arrow_back"
					onClick={() => navigate("/my/categories")}
					caption="К категориям"
				/>
			</Box>
			<EnhancedTable
				onSelect={(ids) => (selectedIds.current = ids)}
				rowsPerPage={rowsPerPage}
				rows={products}
				title={"Товары"}
				rowsPerPageOptions={rowsPerPageOptions}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				page={page}
				actions={([del, add, filter]) => [
					{
						...del,
						componentProps: {
							...filter.componentProps,
							disabled: isFetching,
							onClick: openDeleteDialog,
						},
					},
					{
						...add,
						componentProps: {
							...filter.componentProps,
							disabled: isFetching,
							onClick: openAddProductDialog,
						},
					},
					{
						...filter,
						componentProps: {
							...filter.componentProps,
							disabled: isFetching,
							onClick: () => console.log(selectedIds.current),
						},
					},
				]}
			/>
			<ProductAddDialog
				categoryId={categoryId}
				loading={isFetching}
				onClose={closeAddProductDialog}
				onSubmit={handleSubmitAsync}
				open={isAddProductDialogOn}
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
		</AccountPage>
	);
}
