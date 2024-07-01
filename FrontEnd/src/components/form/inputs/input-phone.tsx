import { TextField } from "@mui/material";
import {
	Controller,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";
import { forwardRef } from "react";
import MaskedInput, { MaskedInputProps } from "react-text-mask";

export function phoneNumberPipe(phone: string): string {
	if (!phone) return "";

	const countryDigit = "7";
	
	let value = phone.replace(/\D/g, "");

	if (value.startsWith("8")) {
		value = countryDigit + value.slice(1);
	}

	let formattedValue = "+";

	switch (value.length) {
		case 0:
			formattedValue = "";
			break;
		case 1:
			formattedValue +=
				value === countryDigit
					? countryDigit
					: countryDigit + " (" + value;
			break;
		case 2:
		case 3:
		case 4:
			formattedValue += value[0] + " (" + value.slice(1);
			break;
		case 5:
		case 6:
		case 7:
			formattedValue +=
				value[0] + " (" + value.slice(1, 4) + ") " + value.slice(4);
			break;
		case 8:
		case 9:
			formattedValue +=
				value[0] +
				" (" +
				value.slice(1, 4) +
				") " +
				value.slice(4, 7) +
				"-" +
				value.slice(7);
			break;
		default:
			formattedValue +=
				value[0] +
				" (" +
				value.slice(1, 4) +
				") " +
				value.slice(4, 7) +
				"-" +
				value.slice(7, 9) +
				"-" +
				value.slice(9, 11);
			break;
	}

	return formattedValue;

	// export function phoneNumberPipe(phone: string): string {
	// 	if (!phone) return "";
	
	// 	// Удаляем все нецифровые символы и заменяем первую "8" на "7" при необходимости
	// 	let value = phone.replace(/\D/g, "").replace(/^8/, "7");
	
	// 	const length = value.length;
	// 	let formattedValue = "+7";
	
	// 	// Форматируем строку в зависимости от длины
	// 	if (length > 1) {
	// 		formattedValue += ` (${value.slice(1, 4)}`;
	// 		if (length >= 5) {
	// 			formattedValue += `) ${value.slice(4, 7)}`;
	// 			if (length >= 8) {
	// 				formattedValue += `-${value.slice(7, 9)}`;
	// 				if (length >= 10) {
	// 					formattedValue += `-${value.slice(9, 11)}`;
	// 				}
	// 			}
	// 		} else {
	// 			formattedValue += value.length === 4 ? ")" : "";
	// 		}
	// 	}
	
	// 	return formattedValue;
	// }
}
interface CustomMaskedInputProps extends MaskedInputProps {
	inputRef: React.Ref<HTMLInputElement>;
}

// Компонент для маскировки ввода
const TextMaskCustom = forwardRef<HTMLElement, CustomMaskedInputProps>(
	(props, ref) => {
		const { mask, ...other } = props;
		return <MaskedInput mask={mask} {...other} />;
	}
);

const getValidateOptions = <T extends FieldValues>(
	required: boolean
): RegisterOptions<T, Path<T>> => ({
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
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = true,
	disabled,
	readonly,
}: IFormBuilderField<T>) {
	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={getValidateOptions(required)}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label + (required ? " *" : "")}
					size={size}
					variant={variant}
					type="text"
					margin={margin}
					fullWidth
					onChange={(e) => {
						const formattedValue = phoneNumberPipe(e.target.value);
						field.onChange(formattedValue); // Обновляем значение в react-hook-form
					}}
					value={field.value}
					error={!!error}
					helperText={error && error.message}
					disabled={disabled}
					autoComplete="tel"
				/>
			)}
		/>
	);
}
