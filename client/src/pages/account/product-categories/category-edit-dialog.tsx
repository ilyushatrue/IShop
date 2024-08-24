import { Dialog, Box } from "@mui/material";
import Form from "../../../components/form/form";
import { IProductCategory } from "../../../api/interfaces/product-categories/product-category.interface";

export default function CategoryEditDialog({
	onClose,
	open,
	action = "create",
	loading = false,
	defaultCategory,
	editCategory,
	categoriesHierarchy,
	onSubmit,
}: {
	onClose: () => void;
	open: boolean;
	action?: "edit" | "create";
	loading: boolean;
	defaultCategory: IProductCategory;
	editCategory?: IProductCategory;
	categoriesHierarchy: IProductCategory[];
	onSubmit: (values: IProductCategory) => void;
}) {
	return (
		<Dialog open={open} onClose={onClose}>
			<Box sx={{ width: 500, paddingX: 2 }}>
				{action === "edit" ? (
					<h4>Редактировать категорию</h4>
				) : (
					<h4>Создать категорию</h4>
				)}
				<Form
					loading={loading}
					actions={([submit]) => [
						{
							value: "Отмена",
							position: "left",
							componentProps: {
								onClick: onClose,
							},
						},
						{ ...submit, value: "Создать" },
					]}
					defaultValues={editCategory ?? defaultCategory}
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
					onSubmit={onSubmit}
				/>
			</Box>
		</Dialog>
	);
}
