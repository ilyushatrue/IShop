import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";

const validation = {
	required: "Обязательно для заполнения",
	validate: (value: string) => {
		if (value.match(/[а-яА-Я]/)) {
			return "Используйте только латиницу";
		}
		if (value.length < 6) {
			return "Длина пароля не менее 6 символов";
		}
		return true;
	},
};
export default function InputPassword<T extends FieldValues>({
	control,
	name,
	label = "Пароль",
	errorMessage,
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
					variant={variant}
					type="password"
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
