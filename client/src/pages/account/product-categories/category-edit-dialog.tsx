import { Dialog, DialogTitle } from "@mui/material";
import { IProductCategory } from "../../../api/interfaces/product-categories/product-category.interface";
import Form from "../../../components/form/form";
import FormActions from "../../../components/form/form-actions";
import { SubmitHandler, useForm } from "react-hook-form";
import OutlinedButton from "../../../components/buttons/outlined-button";
import Button from "../../../components/buttons/button";

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

	const handleSubmitButtonClick: SubmitHandler<IProductCategory> = (
		values
	) => {
		onSubmit(values);
	};

	return (
		<Dialog open={open} fullWidth onClose={onClose}>
			<DialogTitle>
				{`${action === "edit" ? "Редактировать" : "Создать"} категорию`}
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
				<FormActions>
					<OutlinedButton onClick={() => reset()}>
						Отмена
					</OutlinedButton>
					<Button
						onClick={handleSubmit(handleSubmitButtonClick)}
						autoFocus
					>
						Добавить
					</Button>
				</FormActions>
			</Form>
		</Dialog>
	);
}
