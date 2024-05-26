import { TextField } from "@mui/material";
import {
	Controller,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";

const getValidateOptions = <T extends FieldValues>(): RegisterOptions<
	T,
	Path<T>
> => ({
	required: "Обязательно для заполнения",
	pattern: { value: /(?=.*[@])/, message: "Некорректный email" },
});

export default function InputEmail<T extends FieldValues>({
	control,
	name,
	label = "Эл. почта",
	size = "medium",
	variant = "filled",
	margin = "dense",
	required,
}: IFormBuilderField<T>) {
	return (
		<Controller
			control={control}
			name={name}
			rules={getValidateOptions()}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label}
					size={size}
					type="email"
					variant={variant}
					required={required}
					margin={margin}
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
