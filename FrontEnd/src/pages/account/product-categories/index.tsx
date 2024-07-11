import useApi from "../../../api/hooks/use-api.hook";
import productsApi from "../../../api/products.api";
import ProfilePage from "../profile-page";
import { useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import RecursiveTree, {
	IRecursiveTreeColumn,
} from "../../../components/recursive-tree/recursive-tree";
import { IProductCategory } from "../../../api/interfaces/product-categories/queries/product-category.interface";
import MenuEditCell from "./menu-edit-cell";
import Dialog from "../../../components/dialog";
import Form from "../../../components/form/form";
import { Box } from "@mui/material";
import Fab from "../../../components/fab";
import IconButton from "../../../components/icon-button";
import { reload } from "../../../app/helpers/reload";
import Icon from "../../../components/icon";
import MenuDeleteCell from "./menu-delete-cell";

export default function ProductCategories() {
	const defaultCategory = useRef<IProductCategory>({
		iconName: "",
		id: 0,
		name: "",
		order: 0,
	});
	const { fetchAsync, isFetching } = useApi({ triggerPage: true });
	const [editCategory, setEditCategory] = useState<{
		category: IProductCategory;
		action: "create" | "edit" | "delete";
	}>();
	const [categories, setCategories] = useState(
		useAppSelector((state) => state.global.productCategories)
	);
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
		return {
			editAction: editColumn,
			orderColumn: orderColumn,
			deleteColumn: deleteColumn,
		};
	}, []);

	async function handleSaveMenuAsync() {
		fetchAsync({
			request: () => productsApi.syncCategoriesAsync(categories),
			onSuccess: (handler) => handler.do(reload),
			onError: (handler) => handler.log().popup(),
		});
	}

	function handleEditCategory(inputCategory: IProductCategory) {
		const updatedCategories = [...categories];
		let updatedCategoryIndex = -1;
		switch (editCategory!.action) {
			case "create":
				updatedCategories.push(inputCategory);
				break;
			case "edit":
				updatedCategoryIndex = updatedCategories.findIndex(
					(x) => x.name === editCategory!.category.name
				)!;
				updatedCategories[updatedCategoryIndex] = inputCategory;
				break;
			case "delete":
				updatedCategoryIndex = updatedCategories.findIndex(
					(x) => x.name === editCategory!.category.name
				)!;
				updatedCategories.splice(updatedCategoryIndex, 1);
				break;
		}
		setCategories(updatedCategories);
		setEditCategory(undefined);
	}
	if (!categories) return null;
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
					data: categories,
					headerTitle: "Меню",
					id: (x) => x.id,
					icon: (x) => x.iconName,
					minWidth: 300,
					flex: 1,
					title: (x) => `${x.name}`,
				}}
				columnsRange={{
					columns: [
						columns.orderColumn,
						columns.deleteColumn,
						columns.editAction,
					],
				}}
			/>
			{editCategory && (
				<>
					{editCategory.action === "delete" ? (
						<Dialog
							actions={([ok]) => [
								{
									label: "Нет",
									onClick: () => setEditCategory(undefined),
									position: "left",
								},
								{
									...ok,
									label: "Да",
									onClick: () =>
										handleEditCategory(
											editCategory.category
										),
									position: "right",
								},
							]}
							open
							title="Вы уверены?"
							content="Вы действительно хотите удалить категорию?"
						/>
					) : (
						<Dialog open={!!editCategory} actions={() => []}>
							<Box width={500}>
								<Form
									loading={isFetching}
									actions={([submit]) => [
										{
											label: "Отмена",
											position: "left",
											onClick: () =>
												setEditCategory(undefined),
										},
										{ ...submit, label: "Ok" },
									]}
									defaultValues={editCategory.category}
									fullwidth
									fields={(builder) =>
										builder
											.text({
												name: "name",
												label: "Наименование",
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
									}
									minHeight={250}
									onSubmit={(values) =>
										handleEditCategory(values)
									}
								/>
							</Box>
						</Dialog>
					)}
				</>
			)}
			<Fab onClick={handleSaveMenuAsync} color="primary">
				<Icon name="save" />
			</Fab>
		</ProfilePage>
	);
}
