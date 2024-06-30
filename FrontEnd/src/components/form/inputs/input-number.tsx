import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";

const DECIMAL_MAX_VALUE = 79228162514264337593543950335;
export default function InputNumber<T extends FieldValues>({
	control,
	name,
	label,
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = false,
	disabled,
	readonly,
	min = -DECIMAL_MAX_VALUE,
	max = DECIMAL_MAX_VALUE,
}: IFormBuilderField<T> & { min?: number; max?: number }) {
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
				min: { value: min, message: `Минимальное значение ${min}` },
				max: { value: max, message: `Максимальное значение ${max}` },
			}}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label + (required ? " *" : "")}
					margin={margin}
					type="number"
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
