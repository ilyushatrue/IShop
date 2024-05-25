import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { IFormField } from "./form-field.interface";

export default function InputText<T extends FieldValues>({
	control,
	name,
	label,
}: IFormField<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<TextField
					label={label}
					size="small"
					margin="normal"
					fullWidth
					onChange={field.onChange}
					value={field.value}
				/>
			)}
		/>
	);
}
