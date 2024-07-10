import { useEffect, useRef } from "react";
import FormBuilder, { TFormBuilderRef } from "./form-builder";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import Actions, { IAction } from "../actions";

export default function Form<T extends FieldValues>({
	defaultValues,
	fields,
	onSubmit,
	actions,
	minHeight,
	fullwidth = true,
	loading = false,
}: {
	defaultValues: DefaultValues<T>;
	onSubmit: (values: T) => void;
	fields: (builder: TFormBuilderRef<T>) => void;
	actions: (actions: IAction[]) => IAction[];
	minHeight: number | string;
	fullwidth?: boolean;
	loading?: boolean;
}) {
	const builderRef = useRef<TFormBuilderRef<T>>(null);
	const { handleSubmit, control, watch, formState, reset, getValues } =
		useForm<T>({
			mode: "onChange",
			reValidateMode: "onBlur",
			defaultValues,
		});

	useEffect(() => {
		const formValues = getValues();
		if (
			Object.keys(formValues).every(
				(key) => formValues[key] === defaultValues[key]
			)
		) {
			reset(defaultValues);
		}
	}, [defaultValues, getValues, reset]);

	useEffect(() => {
		fields(builderRef.current!);
	}, [fields]);

	return (
		<FormBuilder<T>
			watch={watch}
			control={control}
			handleSubmit={handleSubmit}
			fullwidth={fullwidth}
			onSubmit={onSubmit}
			minHeight={minHeight}
			loading={loading}
			ref={builderRef}
		>
			<Actions
				sx={{marginY: "16px"}}
				actions={actions}
				defaultActions={[
					{
						disabled: !formState.isDirty || loading,
						label: "Отправить",
						type: "submit",
						position: "right",
						sx: {
							minwidth: "50%",
							textTransform: "none",
						},
					},
					{
						disabled: !formState.isDirty || loading,
						label: "Отменить",
						type: "reset",
						onClick: () => reset(),
						position: "left",
						sx: {
							minwidth: "50%",
							textTransform: "none",
						},
					},
				]}
			/>
		</FormBuilder>
	);
}
