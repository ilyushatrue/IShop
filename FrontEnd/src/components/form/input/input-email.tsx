import { TextField } from "@mui/material";
import {
	Controller,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";

const getValidateOptions = <T extends FieldValues>(
	required: boolean
): RegisterOptions<T, Path<T>> => ({
	required: { value: required, message: "Обязательно для заполнения" },
	pattern: { value: /(?=.*[@])/, message: "Некорректный email" },
});

export default function InputEmail<T extends FieldValues>({
	control,
	name,
	label = "Эл. почта",
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = false,
	disabled,
	readonly,
}: IFormBuilderField<T>) {
	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={getValidateOptions(required)}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label + (required ? " *" : "")}
					size={size}
					type="email"
					variant={variant}
					margin={margin}
					disabled={disabled}
					InputProps={{ readOnly: readonly }}
					fullWidth
					onChange={field.onChange}
					value={field.value}
					error={!!error}
					helperText={error && error.message}
				/>
			)}
		/>
	);
}
