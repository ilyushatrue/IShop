import useApi from "../../../api/hooks/use-api.hook";
import productsApi from "../../../api/endpoints/products.api";
import ProfilePage from "../profile-page";
import { useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import RecursiveTree, {
	IRecursiveTreeColumn,
} from "../../../components/recursive-tree/recursive-tree";
import { IProductCategory } from "../../../api/interfaces/product-categories/product-category.interface";
import MenuEditCell from "./menu-edit-cell";
import Dialog from "../../../components/dialog";
import Form from "../../../components/form/form";
import { Box, Button, Icon, Dialog as MuiDialog } from "@mui/material";
import Fab from "../../../components/fab";
import { reload } from "../../../app/helpers/reload";
import MenuDeleteCell from "./menu-delete-cell";
import { useNavigate } from "react-router-dom";

export default function ProductCategories() {
	const defaultCategory = useRef<IProductCategory>({
		id: 0,
		name: "",
		title: "",
		order: 0,
		parentId: null,
		iconName: "",
		children: [],
		parent: null,
	});
	const { fetchAsync, isFetching } = useApi({ triggerPage: true });
	const navigate = useNavigate();
	const [editCategory, setEditCategory] = useState<{
		category?: IProductCategory;
		action: "create" | "edit" | "delete";
	}>();
	const categories = useAppSelector(
		(state) => state.global.productCategories
	);
	const categoriesHierarchy = useMemo(() => {
		const recurs = (parent: IProductCategory) => {
			parent.children = parent.children.map((child) => {
				let newChild = { ...child };
				if (newChild.parentId) {
					newChild.parent = parent;
				}
				return newChild;
			});
			return parent;
		};

		let values = categories.map((category) => recurs({ ...category }));
		return values;
	}, [categories]);
	const columns = useMemo(() => {
		const orderColumn: IRecursiveTreeColumn<IProductCategory> = {
			width: 200,
			headerTitle: "Порядок",
			cell: (x) => (
				<Box
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					height={"100%"}
				>
					{x.order}
				</Box>
			),
		};

		const editColumn: IRecursiveTreeColumn<IProductCategory> = {
			width: 42,
			cell: (x) => (
				<MenuEditCell
					onClick={() =>
						setEditCategory({ category: x, action: "edit" })
					}
					isLoading={false}
				/>
			),
		};

		const deleteColumn: IRecursiveTreeColumn<IProductCategory> = {
			width: 42,
			cell: (x) => (
				<MenuDeleteCell
					onClick={() =>
						setEditCategory({ category: x, action: "delete" })
					}
					isLoading={false}
				/>
			),
		};

		const productsColumn: IRecursiveTreeColumn<IProductCategory> = {
			width: 300,
			headerTitle: "Товары",
			cell: (x) => {
				const items: string[] = [];
				let currentItem: IProductCategory | null = x;
				const getPath = (y: IProductCategory) => {
					return y.parent;
				};
				while (currentItem != null) {
					items.push(currentItem.name);
					currentItem = getPath(currentItem);
				}
				items.reverse().join("/");
				const itemsPath = items.join("/");

				return (
					<Box
						height={"100%"}
						sx={{
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Button
							variant="outlined"
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/my/products/${itemsPath}`);
							}}
							sx={{ typography: { textTransform: "none" } }}
						>
							Перейти...
						</Button>
					</Box>
				);
			},
		};

		return {
			productsColumn,
			editColumn,
			orderColumn,
			deleteColumn,
		};
	}, []);

	async function handleSaveMenuAsync(values: IProductCategory[]) {
		fetchAsync({
			request: () => productsApi.syncCategoriesAsync(values),
			onSuccess: (handler) => handler.do(reload),
			onError: (handler) => handler.log().popup(),
		});
	}

	function handleEditCategory(inputCategory: IProductCategory) {
		const updatedCategories = [...categoriesHierarchy];
		let updatedCategoryIndex = -1;
		switch (editCategory!.action) {
			case "create":
				updatedCategories.push(inputCategory);
				break;
			case "edit":
				updatedCategoryIndex = updatedCategories.findIndex(
					(x) => x.name === editCategory!.category!.name
				)!;
				updatedCategories[updatedCategoryIndex] = inputCategory;
				break;
			case "delete":
				updatedCategoryIndex = updatedCategories.findIndex(
					(x) => x.name === editCategory!.category!.name
				)!;
				updatedCategories.splice(updatedCategoryIndex, 1);
				break;
		}
		setEditCategory(undefined);
		const nullifyParent = (
			categories: IProductCategory[]
		): IProductCategory[] => {
			categories.forEach((category) => {
				if (category.children?.length) {
					category.children.forEach((child) => {
						child.parent = null;
					});
					nullifyParent(category.children);
				}
				category.parent = null;
			});
			return categories;
		};
		handleSaveMenuAsync(nullifyParent(updatedCategories));
	}

	if (!categoriesHierarchy) return null;
	return (
		<ProfilePage title="Категории товаров">
			<Box sx={{ display: "flex", justifyContent: "end", padding: 1 }}>
				<Button
					onClick={() =>
						setEditCategory({
							category: defaultCategory.current,
							action: "create",
						})
					}
					size="small"
					sx={{
						bgcolor: "primary.main",
						marginLeft: "auto",
						textTransform: "none",
						color: "primary.100",
						paddingX: 2,
						"&:hover": {
							bgcolor: "primary.dark",
						},
					}}
					startIcon={<Icon>add</Icon>}
				>
					Добавить
				</Button>
			</Box>
			<RecursiveTree<IProductCategory>
				headerSx={{
					bgcolor: "whitesmoke",
					color: "black",
				}}
				containerSx={{
					width: "100%",
					overflow: "hidden",
				}}
				row={{
					height: 60,
					sx: { paddingX: 2 },
					onClick: console.log,
				}}
				tree={{
					data: categoriesHierarchy,
					headerTitle: "Меню",
					id: (x) => x.id,
					icon: (x) => x.iconName ?? "",
					children: (x) => x.children ?? [],
					minWidth: 300,
					flex: 1,
					title: (x) => `${x.title}`,
				}}
				columnsRange={{
					columns: [
						columns.orderColumn,
						columns.productsColumn,
						columns.deleteColumn,
						columns.editColumn,
					],
				}}
			/>
			<Dialog
				onEnterKeyPress={() =>
					handleEditCategory(editCategory!.category!)
				}
				onClose={() => setEditCategory(undefined)}
				onOk={() => handleEditCategory(editCategory!.category!)}
				actions={([ok]) => [
					{
						value: "Нет",
						onClick: () => setEditCategory(undefined),
						position: "left",
					},
					{
						...ok,
						value: "Да",
					},
				]}
				open={editCategory?.action === "delete"}
				title="Вы уверены?"
				content="Вы действительно хотите удалить категорию?"
			/>
			<MuiDialog
				open={
					["create", "edit"].includes(editCategory?.action ?? "") &&
					!!editCategory?.category
				}
				onClose={() =>
					setEditCategory((prev) => ({
						...prev!,
						category: undefined,
					}))
				}
			>
				<Box sx={{ width: 500, paddingX: 2 }}>
					{editCategory?.action === "edit" ? (
						<h4>Редактировать категорию</h4>
					) : (
						<h4>Создать категорию</h4>
					)}
					<Form
						loading={isFetching}
						actions={([submit]) => [
							{
								value: "Отмена",
								position: "left",
								componentProps: {
									onClick: () =>
										setEditCategory((prev) => ({
											...prev!,
											category: undefined,
										})),
								},
							},
							{ ...submit, value: "Создать" },
						]}
						defaultValues={
							editCategory?.category ?? defaultCategory.current
						}
						fullwidth
						fields={(builder) =>
							builder
								.text({
									name: "name",
									label: "Системное наименование",
									required: true,
								})
								.text({
									name: "title",
									label: "Заголовок",
									required: true,
								})
								.text({
									name: "iconName",
									label: "Название иконки",
									required: true,
								})
								.number({
									name: "order",
									label: "Порядок",
									required: true,
								})
								.select({
									name: "parentId",
									label: "Подкатегория категории",
									options: categoriesHierarchy.map((c) => ({
										key: c.id,
										value: c.title,
									})),
								})
						}
						minHeight={250}
						onSubmit={(values) => handleEditCategory(values)}
					/>
				</Box>
			</MuiDialog>
		</ProfilePage>
	);
}
