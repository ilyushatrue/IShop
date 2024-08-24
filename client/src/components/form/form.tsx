import { CSSProperties, useEffect, useRef } from "react";
import FormBuilder, { FormBuilderRef } from "./form-builder";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import Actions, { IAction } from "../actions";
import { SxProps } from "@mui/material";

export interface FormProps<T extends FieldValues> {
	defaultValues: DefaultValues<T>;
	onSubmit: (values: T) => void;
	fields: (builder: FormBuilderRef<T>) => void;
	actions: (actions: IAction[]) => IAction[];
	fullwidth?: boolean;
	loading?: boolean;
	style?: CSSProperties;
	actionProps?: SxProps;
}
export default function Form<T extends FieldValues>({
	defaultValues,
	fields,
	onSubmit,
	actions,
	fullwidth = true,
	loading = false,
	style,
	actionProps,
}: FormProps<T>) {
	const builderRef = useRef<FormBuilderRef<T>>(null);
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
	}, [defaultValues, getValues, reset, formState.isValid]);

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
			loading={loading}
			ref={builderRef}
			style={style}
		>
			<Actions
				sx={{ ...actionProps, marginY: "16px" }}
				actions={actions}
				defaultActions={[
					{
						componentProps: {
							disabled: !formState.isDirty || loading,
							type: "submit",
						},
						value: "Отправить",
						position: "right",
					},
					{
						componentProps: {
							disabled: !formState.isDirty || loading,
							type: "reset",
							onClick: () => reset(),
						},
						value: "Отменить",
						position: "left",
					},
				]}
			/>
		</FormBuilder>
	);
}
