import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";

export default function InputText<T extends FieldValues>({
	control,
	name,
	label,
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = false,
	disabled,
	readonly,
}: IFormBuilderField<T>) {
	return (
		<Controller
			control={control}
			name={name}
			rules={{
				required: {
					value: required,
					message: "Обязательно для заполнения",
				},
			}}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label + (required ? " *" : "")}
					margin={margin}
					type="text"
					size={size}
					variant={variant}
					disabled={disabled}
					InputProps={{ readOnly: readonly }}
					fullWidth
					onChange={field.onChange}
					value={field.value}
					error={!!error}
					helperText={error ? error.message : ""}
				/>
			)}
		/>
	);
}
