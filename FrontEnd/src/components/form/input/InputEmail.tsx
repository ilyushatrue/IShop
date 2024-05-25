import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { IFormField } from "./form-field.interface";

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
}: IFormField<T>) {
	return (
		<Controller
			control={control}
			name={name}
			rules={validation}
			render={({ field }) => (
				<TextField
					label={label}
					size="small"
					type="email"
					margin="normal"
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