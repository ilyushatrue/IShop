import { DialogTitle } from "@mui/material";
import { IProductCategory } from "../../../api/interfaces/product-categories/product-category.interface";
import Dialog from "../../../components/dialog";
import Form from "../../../components/form/form";
import FormActions from "../../../components/form/form-actions";
import { SubmitHandler, useForm } from "react-hook-form";

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
	const { watch, handleSubmit, control, reset } = useForm<IProductCategory>({
		defaultValues: editCategory ?? defaultCategory,
	});

	const handleEnterKeyPressed: SubmitHandler<IProductCategory> = (values) => {
		onSubmit(values);
	};
	return (
		<Dialog
			open={open}
			fullWidth
			onClose={onClose}
			onEnterKeyPress={handleSubmit(handleEnterKeyPressed)}
		>
			<DialogTitle>
				{action === "edit"
					? "Редактировать категорию"
					: "Создать категорию"}
			</DialogTitle>
			<Form
				loading={loading}
				style={{ padding: 20 }}
				watch={watch}
				control={control}
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
			>
				<FormActions
					disabled={loading}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					reset={reset}
				/>
			</Form>
		</Dialog>
	);
}
