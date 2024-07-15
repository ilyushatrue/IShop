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
import { Box, Dialog as MuiDialog, Typography } from "@mui/material";
import Fab from "../../../components/fab";
import IconButton from "../../../components/icon-button";
import { reload } from "../../../app/helpers/reload";
import Icon from "../../../components/icon";
import MenuDeleteCell from "./menu-delete-cell";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";

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
	const [categoriesHierarchy, setCategoriesHierarchy] = useState(() => {
		const recurs = (parent: IProductCategory) => {
			console.log(parent.name);
			parent.children = parent.children.map((child) => {
				// Создаем новый объект child с новыми свойствами
				let newChild = { ...child };
				if (newChild.parentId) {
					newChild.parent = parent;
				}
				return newChild;
			});
			return parent;
		};

		let values = categories.map((category) => recurs({ ...category }));
		console.log(values);
		return values;
	});
	console.log(categoriesHierarchy);
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
					items.push(currentItem.name)
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
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/categories/${itemsPath}`);
							}}
						>
							<Typography>Перейти...</Typography>
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

	async function handleSaveMenuAsync() {
		console.log(categoriesHierarchy);
		fetchAsync({
			request: () => productsApi.syncCategoriesAsync(categoriesHierarchy),
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
		setCategoriesHierarchy(updatedCategories);
		setEditCategory(undefined);
	}

	console.log(categoriesHierarchy);
	if (!categoriesHierarchy) return null;
	return (
		<ProfilePage>
			<Box sx={{ bgcolor: "primary.light", padding: 1 }}>
				<IconButton
					iconName="add"
					fontSize={20}
					buttonSx={{
						bgcolor: "primary.main",
						marginLeft: "auto",
						paddingX: 2,
						"&:hover": {
							bgcolor: "primary.dark",
						},
					}}
					color={"primary.100"}
					onClick={() =>
						setEditCategory({
							category: defaultCategory.current,
							action: "create",
						})
					}
					caption="Добавить"
				/>
			</Box>
			<RecursiveTree<IProductCategory>
				headerSx={{
					borderBottom: "1px solid",
					borderColor: "primary.main",
					bgcolor: "primary.light",
					color: "white",
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
						label: "Нет",
						onClick: () => setEditCategory(undefined),
						position: "left",
					},
					{
						...ok,
						label: "Да",
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
								label: "Отмена",
								position: "left",
								onClick: () =>
									setEditCategory((prev) => ({
										...prev!,
										category: undefined,
									})),
							},
							{ ...submit, label: "Ok" },
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
			<Fab onClick={handleSaveMenuAsync} color="primary">
				<Icon name="save" />
			</Fab>
		</ProfilePage>
	);
}
