import { useForm, SubmitHandler } from "react-hook-form";
import OutlinedButton from "../../../../components/buttons/outlined-button";
import FormActions from "../../../../components/form/form-actions";
import { IProduct } from "../../../../api/interfaces/product/product.interface";
import { useEffect } from "react";
import Button from "../../../../components/buttons/button";
import InputImage from "../../../../components/form/inputs/input-image";
import InputText from "../../../../components/form/inputs/input-text";
import InputNumber from "../../../../components/form/inputs/input-number";
import Form from "../../../../components/form/form";

export default function ProductEditForm({
	onSubmit,
	defaultValues,
	loading,
}: {
	defaultValues: IProduct;
	onSubmit: (values: IProduct) => void;
	loading: boolean;
}) {
	const { handleSubmit, control, reset, formState } = useForm<IProduct>({
		mode: "onBlur",
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
		<Form onEnterKeyDown={handleSubmit(handleSubmitButtonClick)}>
			<InputImage
				control={control}
				name="imageId"
				containerSized
				label="Изображение"
			/>
			<InputText
				control={control}
				name="name"
				label="Наименование"
				required
			/>
			<InputText
				control={control}
				name="description"
				label="Описание"
				required
				multiline
			/>
			<InputNumber
				control={control}
				name="price"
				label="Цена"
				required
				min={1}
				max={1_000_000}
			/>
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
					Сохранить
				</Button>
			</FormActions>
		</Form>
	);
}
