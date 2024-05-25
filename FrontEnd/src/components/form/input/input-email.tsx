import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";

const validation = {
	required: "Обязательно для заполнения",
	validate: (value: string) => {
		if (value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
			return "Используйте только латиницу";
		}
		return true;
	},
};

export default function InputEmail<T extends FieldValues>({
	control,
	name,
	errorMessage,
	label = "Эл. почта",
	size = "medium",
	variant = "filled",
	margin = "dense",
}: IFormBuilderField<T>) {
	return (
		<Controller
			control={control}
			name={name}
			rules={validation}
			render={({ field }) => (
				<TextField
					label={label}
					size={size}
					type="email"
					variant={variant}
					margin={margin}
					fullWidth
					onChange={field.onChange}
					value={field.value}
					error={!!errorMessage}
					helperText={errorMessage}
				/>
			)}
		/>
	);
}
