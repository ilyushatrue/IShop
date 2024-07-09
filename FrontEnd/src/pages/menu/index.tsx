import useApi from "../../api/hooks/use-api.hook";
import productsApi from "../../api/products.api";
import ProfilePage from "../profile-page";
import { useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import RecursiveTree, {
	IRecursiveTreeColumn,
} from "../../components/recursive-tree/recursive-tree";
import { IProductCategory } from "../../api/interfaces/product/categories/product-category.interface";
import MenuEditCell from "./menu-edit-cell";
import Dialog from "../../components/dialog";
import Form from "../../components/form/form";
import { Box } from "@mui/material";
import Fab from "../../components/fab";
import IconButton from "../../components/icon-button";
import { reload } from "../../app/helpers/reload";

export default function Menu() {
	const defaultCategory = useRef<IProductCategory>({
		iconName: "",
		id: 0,
		name: "",
		order: 0,
	});
	const { fetchAsync, isFetching } = useApi();
	const [editCategory, setEditCategory] = useState<IProductCategory>();
	const [categories, setCategories] = useState(
		useAppSelector((state) => state.global.productCategories)
	);
	const columns = useMemo(() => {
		const editColumn: IRecursiveTreeColumn<IProductCategory> = {
			width: 42,
			cell: (x) => (
				<MenuEditCell
					onClick={() => setEditCategory(x)}
					isLoading={false}
				/>
			),
		};
		return {
			editAction: editColumn,
		};
	}, []);

	async function handleSaveMenuAsync() {
		fetchAsync({
			request: () => productsApi.syncCategoriesAsync(categories),
			onSuccess: (handler) => handler.do(reload),
			onError: (handler) => handler.log().popup(),
		});
	}

	function handleEditCategory(values: IProductCategory) {
		const updatedCategories = [...categories];
		const updatedCategoryIndex = updatedCategories.findIndex(
			(x) => x.id === editCategory!.id
		)!;
		updatedCategories[updatedCategoryIndex] = values;
		setCategories(updatedCategories);
		setEditCategory(undefined);
	}
	console.log(categories);
	if (!categories || !categories.length) return null;
	return (
		<ProfilePage>
			<Box>
				<IconButton
					iconName="add"
					onClick={() => setEditCategory(defaultCategory.current)}
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
					borderRadius: 5,
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
					title: (x) => x.name,
				}}
				columnsRange={{
					columns: [
						{
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
							width: 200,
							headerTitle: "Порядок",
						},
						columns.editAction,
					],
				}}
			/>
			{editCategory && (
				<Dialog open={!!editCategory}>
					<Box width={500}>
						<Form
							loading={isFetching}
							actions={([submit]) => [
								{
									label: "Отмена",
									position: "left",
									onClick: () => setEditCategory(undefined),
								},
								{ ...submit, label: "Ok" },
							]}
							defaultValues={editCategory}
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
							onSubmit={handleEditCategory}
						/>
					</Box>
				</Dialog>
			)}
			<Fab sx={{ bgcolor: "primary.light" }}>
				<IconButton iconName="save" onClick={handleSaveMenuAsync} />
			</Fab>
		</ProfilePage>
	);
}
