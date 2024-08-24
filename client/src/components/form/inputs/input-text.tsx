import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IFormField } from "./form-field.interface";

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
}: { control: Control<T> } & IFormField<T>) {
	return (
		<Controller
			key={name}
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
					autoComplete="off"
					helperText={error && error.message}
				/>
			)}
		/>
	);
}
