import { useEffect, useMemo, useRef, useState } from "react";
import useApi from "../../../api/hooks/use-api.hook";
import ProductsApi from "../../../api/endpoints/products.api";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import { IProductCategory } from "../../../api/interfaces/product-categories/product-category.interface";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { reload } from "../../../app/helpers/reload";
import AccountProtectedPage from "../account-protected-page";
import ConfirmDialog from "../../../components/dialogs/confirm-dialog";
import ProductsTable from "./products-table";
import AccountPageSideBox from "../account-page-side-box";
import AccountPageMainBox from "../account-page-main-box";
import AccountPageMainBoxHeader from "../account-page-main-box-header";
import { ProductCategoryEnum } from "../../../api/enums/product-category.enum";

export default function ProductsMenu() {
	const { category } = useParams();
	const categoryEnum =
		ProductCategoryEnum[category!.capitalize() as keyof typeof category] +
		1;
	console.log(category, categoryEnum);
	const [confirmDeleteState, setConfirmDeleteState] = useState<{
		open: boolean;
		items: IProduct[];
	}>({ open: false, items: [] });
	const { isFetching, fetchAsync } = useApi();
	const [products, setProducts] = useState<IProduct[]>([]);
	const rowsPerPageOptions = [10, 25, 100];
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [page, setPage] = useState(0);
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
				? ProductsApi.getByCategoryAsync(categoryId, page, rowsPerPage)
				: ProductsApi.getAllAsync(page, rowsPerPage),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then((res) => setProducts(res!.body!.pageItems!))
			.catch();
	}, [categoryId, fetchAsync, page, rowsPerPage]);

	const handleAddProduct = () => {
		navigate("add");
	};

	const handleEditProduct = (item: IProduct) => {
		navigate(item.id);
	};

	async function handleSubmitAsync(values: ICreateProductCommand) {
		await fetchAsync({
			request: ProductsApi.createAsync(values),
			onSuccess: (handler) => handler.popup("Новый товар добавлен."),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then(reload)
			.catch();
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
	async function handleDeleteProductAsync(products: IProduct[]) {
		closeDeleteDialog();
		const ids = products.map((p) => p.id);
		fetchAsync({
			request: ProductsApi.deleteRangeByIdAsync(ids),
			onSuccess: (handler) => handler.popup("Данные сохранены"),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then((response) => {
				if (response.ok) {
					setProducts((prev) =>
						prev.filter((x) => !ids.includes(x.id))
					);
				}
			})
			.catch();
	}
	const closeDeleteDialog = () => {
		setConfirmDeleteState((prev) => ({ ...prev, open: false }));
	};

	const handleDeleteClick = (items: IProduct[]) => {
		setConfirmDeleteState({ open: true, items: items });
	};

	return (
		<AccountProtectedPage>
			<AccountPageSideBox />
			<AccountPageMainBox>
				<AccountPageMainBoxHeader
					backText="К категориям"
					backUrl="/my/categories"
				>
					Продукты
				</AccountPageMainBoxHeader>

				<ProductsTable
					loading={isFetching}
					onAdd={handleAddProduct}
					onChange={console.log}
					onDelete={handleDeleteClick}
					onEdit={handleEditProduct}
					rows={products}
					rowsPerPage={rowsPerPage}
				/>
				<ConfirmDialog
					onClose={closeDeleteDialog}
					open={confirmDeleteState.open}
					title="Удалить товары"
					onConfirm={() =>
						handleDeleteProductAsync(confirmDeleteState.items)
					}
					content="Вы действительно хотите удалить выбранные товары?"
				/>
			</AccountPageMainBox>
		</AccountProtectedPage>
	);
}
