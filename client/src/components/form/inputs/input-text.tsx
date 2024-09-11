import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IFormField } from "./form-field.interface";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";

export default function InputText<T extends FieldValues>({
	control,
	name,
	label,
	size,
	variant = "filled",
	margin = "dense",
	required = false,
	disabled,
	readonly,
	multiline,
}: { control: Control<T> } & IFormField<T>) {
	const { xs } = useMediaQueryContext();
	size = size || (xs ? "small" : "medium");
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
					multiline={multiline}
					type="text"
					size={size}
					variant={variant}
					disabled={disabled}
					InputProps={{ readOnly: readonly }}
					fullWidth
					onBlur={field.onBlur}
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
