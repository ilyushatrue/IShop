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
}: IFormBuilderField<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<TextField
					label={label}
					margin={margin}
					size={size}
					variant={variant}
					fullWidth
					onChange={field.onChange}
					value={field.value}
				/>
			)}
		/>
	);
}
