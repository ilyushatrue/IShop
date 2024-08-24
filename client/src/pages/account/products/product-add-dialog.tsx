import { ICreateProductCommand } from "../../../api/interfaces/product/commands/create-product-command.interface";
import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import FormDialog from "../../../components/form-dialog";

export default function ProductAddDialog({
	categoryId,
	open,
	onClose,
	onSubmit,
	loading,
}: {
	categoryId: number;
	loading: boolean;
	open: boolean;
	onClose: () => void;
	onSubmit: (values: ICreateProductCommand) => void;
}) {
	const categories = useAppSelector(
		(state) => state.global.productCategories
	);
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

	if (!categories) return null;
	return (
		<FormDialog
			dialogProps={{
				title: "Добавить товар",
				open: open,
				onClose: onClose,
			}}
			formProps={{
				loading: loading,
				defaultValues: defaultValues,
				actions: ([submit, reset]) => [
					{
						...submit,
						value: "Добавить товар",
						componentProps: {
							...submit.componentProps,
							fullWidth: true,
						},
					},
					{
						...reset,
						value: "Отмена",
						componentProps: {
							...reset.componentProps,
							disabled: false,
							onClick: onClose,
						},
					},
				],
				fields: (builder) =>
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
						}),
				onSubmit: onSubmit,
			}}
		/>
	);
}
