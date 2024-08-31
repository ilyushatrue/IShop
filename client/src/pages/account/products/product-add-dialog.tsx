import { DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import Form from "../../../components/form/form";
import { useMemo } from "react";
import FormActions from "../../../components/form/form-actions";
import Dialog from "../../../components/dialog";

export default function ProductAddDialog({
	onSubmit,
	categoryId,
	loading,
	onClose,
	open,
}: {
	categoryId: number;
	onSubmit: (values: ICreateProductCommand) => void;
	loading: boolean;
	open: boolean;
	onClose: () => void;
}) {
	const defaultValues = useMemo<ICreateProductCommand>(
		() => ({
			description: "",
			imageId: "",
			name: "",
			categoryId: categoryId,
			price: 0,
		}),
		[categoryId]
	);
	const { handleSubmit, control, watch, reset } =
		useForm<ICreateProductCommand>({
			mode: "onChange",
			reValidateMode: "onBlur",
			defaultValues: defaultValues,
		});
	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Добавить продукт</DialogTitle>
			<DialogContent>
				<Form
					loading={loading}
					watch={watch}
					control={control}
					fields={(builder) =>
						builder
							.image({
								name: "imageId",
								required: true,
								shape: "rounded",
								containerSized: true,
							})
							.text({
								name: "name",
								label: "Наименование",
								required: true,
							})
							.text({
								name: "description",
								label: "Описание",
								required: true,
							})
							.number({
								name: "price",
								label: "Цена",
								required: true,
								min: 1,
							})
					}
				>
					<FormActions
						disabled={loading}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						reset={() => {
							onClose();
							reset();
						}}
					/>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
