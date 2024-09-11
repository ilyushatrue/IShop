import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IFormField } from "./form-field.interface";

const DECIMAL_MAX_VALUE = 79228162514264337593543950335;
export interface IFormNumberField<T extends FieldValues> extends IFormField<T> {
	min?: number;
	max?: number;
}
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
}: IFormNumberField<T> & { control: Control<T> }) {
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
					onBlur={field.onBlur}
					value={field.value}
					error={!!error}
					helperText={error && error.message}
				/>
			)}
		/>
	);
}
