import { useForm, SubmitHandler } from "react-hook-form";
import { useMediaQueryContext } from "../../../../app/infrastructure/media-query-context";
import OutlinedButton from "../../../../components/buttons/outlined-button";
import FormActions from "../../../../components/form/form-actions";
import { IProduct } from "../../../../api/interfaces/product/product.interface";
import Form from "../../../../components/form/form";
import { useEffect } from "react";
import Button from "../../../../components/buttons/button";

export default function ProductEditForm({
	onSubmit,
	defaultValues,
	loading,
}: {
	defaultValues: IProduct;
	onSubmit: (values: IProduct) => void;
	loading: boolean;
}) {
	const { xs } = useMediaQueryContext();
	const size = xs ? "small" : "medium";
	const { handleSubmit, control, watch, reset, formState } =
		useForm<IProduct>({
			mode: "onChange",
			reValidateMode: "onBlur",
			defaultValues,
		});

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const handleSubmitButtonClick: SubmitHandler<IProduct> = (values) => {
		onSubmit(values);
	};

	return (
		<Form
			control={control}
			watch={watch}
			loading={loading}
			fields={(builder) =>
				builder
					.image({
						name: "imageId",
						required: true,
						size: size,
						label: "Изображение",
						containerSized: true,
					})
					.text({
						name: "name",
						required: true,
						label: "Наименование",
						size: size,
					})
					.text({
						name: "description",
						label: "Описание",
						multiline: true,
						size: size,
					})
					.number({
						name: "price",
						label: "Цена",
						min: 1,
						max: 1_000_000,
						size: size,
					})
			}
		>
			<FormActions
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				<OutlinedButton
					size="large"
					onClick={() => reset()}
					disabled={loading || !formState.isDirty}
				>
					Отмена
				</OutlinedButton>
				<Button
					size="large"
					onClick={handleSubmit(handleSubmitButtonClick)}
					autoFocus
					disabled={loading || !formState.isDirty}
				>
					Добавить
				</Button>
			</FormActions>
		</Form>
	);
}
