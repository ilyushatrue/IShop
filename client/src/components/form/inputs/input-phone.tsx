import { TextField } from "@mui/material";
import {
	Control,
	Controller,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import { IFormField } from "./form-field.interface";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";

export function phoneNumberPipe(phone: string): string {
	const countryDigit = "7";
	let value = phone.replace(/\D/g, "");

	if (value.length > 0 && !/^7|8/.test(value[0])) {
		value = countryDigit + value;
	} else {
		value = value.replace(/^8/, countryDigit);
	}

	if (!value) return "";

	let formattedValue = `+${countryDigit}`;

	if (value.length > 1) {
		formattedValue += ` (${value.slice(1, 4)}`;
	}
	if (value.length >= 5) {
		formattedValue += `) ${value.slice(4, 7)}`;
	}
	if (value.length >= 8) {
		formattedValue += `-${value.slice(7, 9)}`;
	}
	if (value.length >= 10) {
		formattedValue += `-${value.slice(9, 11)}`;
	}
	return formattedValue;
}

const getValidateOptions = <T extends FieldValues>(
	required: boolean
): Omit<
	RegisterOptions<T, Path<T>>,
	"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> => ({
	required: { value: required, message: "Обязательно для заполнения" },
	validate: (value: string) => {
		const trimmedValue = value.replace(/\D/g, "");
		if (trimmedValue.length > 0 && trimmedValue.length !== 11) {
			return "Некорректный номер";
		}
		return true;
	},
});

export function InputPhone<T extends FieldValues>({
	control,
	name,
	label = "Номер телефона",
	size,
	variant = "filled",
	margin = "dense",
	required = false,
	disabled,
	readonly,
}: { control: Control<T> } & IFormField<T>) {
	const { xs } = useMediaQueryContext();
	size = size || (xs ? "small" : "medium");
	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={getValidateOptions<T>(required)}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label + (required ? " *" : "")}
					size={size}
					variant={variant}
					type="text"
					margin={margin}
					fullWidth
					onBlur={field.onBlur}
					onChange={(e) => {
						const formattedValue = phoneNumberPipe(e.target.value);
						field.onChange(formattedValue);
					}}
					value={phoneNumberPipe(field.value)}
					error={!!error}
					helperText={error && error.message}
					disabled={disabled}
					autoComplete="tel"
					InputProps={{ readOnly: readonly }}
				/>
			)}
		/>
	);
}
