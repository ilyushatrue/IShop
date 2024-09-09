import { useEffect, useMemo, useRef, useState } from "react";
import useApi from "../../../api/hooks/use-api.hook";
import { Box } from "@mui/material";
import productsApi from "../../../api/endpoints/products.api";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import { IProductCategory } from "../../../api/interfaces/product-categories/product-category.interface";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import IconButton from "../../../components/buttons/icon-button";
import { reload } from "../../../app/helpers/reload";
import AccountProtectedPage from "../account-protected-page";
import ProductAddDialog from "./product-add-dialog";
import ConfirmDialog from "../../../components/confirm-dialog";
import ProductsTable from "./products-table";
import AccountPageSideBox from "../account-page-side-box";
import AccountPageMainBox from "../account-page-main-box";
import AccountPageMainBoxHeader from "../account-page-main-box-header";
import { ProductCategoryEnum } from "../../../api/enums/product-category.enum";

export default function ProductsMenu() {
	const { category } = useParams();
	const categoryEnum =
		ProductCategoryEnum[category!.toUpperCase() as keyof typeof category];
	console.log(categoryEnum);
	const [isDeleteDialogOn, setIsDeleteDialogOn] = useState(false);
	const { isFetching, fetchAsync } = useApi();
	const [products, setProducts] = useState<IProduct[]>([]);
	const rowsPerPageOptions = [10, 25, 100];
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [page, setPage] = useState(0);
	const selectedIds = useRef<string[]>([]);
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
			request: categoryId
				? productsApi.getByCategoryAsync(categoryId, page, rowsPerPage)
				: productsApi.getAllAsync(page, rowsPerPage),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		}).then((res) => setProducts(res!.body!.pageItems!));
	}, []);

	const handleAddProduct = () => {
		navigate("add");
	};

	const handleEditProduct = (item: IProduct) => {
		navigate(item.id);
	};

	async function handleSubmitAsync(values: ICreateProductCommand) {
		await fetchAsync({
			request: productsApi.createAsync(values),
			onSuccess: (handler) => handler.popup("Новый товар добавлен."),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		}).then(reload);
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
		closeDeleteDialog();
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
	const openDeleteDialog = (items: any[]) => setIsDeleteDialogOn(true);
	return (
		<AccountProtectedPage>
			<AccountPageSideBox />
			<AccountPageMainBox>
				<AccountPageMainBoxHeader>Продукты</AccountPageMainBoxHeader>
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
				<ProductsTable
					loading={isFetching}
					onAdd={handleAddProduct}
					onChange={console.log}
					onDelete={console.log}
					onEdit={handleEditProduct}
					rows={products}
					rowsPerPage={rowsPerPage}
				/>
				<ConfirmDialog
					onClose={closeDeleteDialog}
					open={isDeleteDialogOn}
					title="Удалить товары"
					onConfirm={() =>
						handleDeleteProductAsync(selectedIds.current)
					}
					content="Вы действительно хотите удалить выбранные товары?"
				/>
			</AccountPageMainBox>
		</AccountProtectedPage>
	);
}
