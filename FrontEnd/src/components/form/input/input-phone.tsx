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

interface CustomMaskedInputProps extends MaskedInputProps {
	inputRef: React.Ref<HTMLInputElement>;
}

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
		if (value.replace(/\D/g, "").length !== 11) {
			return "Некорректный номер";
		}
		return true;
	},
});

export default function InputPhone<T extends FieldValues>({
	control,
	name,
	label = "Номер телефона",
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = true,
}: IFormBuilderField<T>) {
	return (
		<Controller
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
					onChange={field.onChange}
					value={field.value}
					error={!!error}
					helperText={error && error.message}
					InputProps={{
						inputComponent: TextMaskCustom as any,
						inputProps: {
							mask: [
								"+",
								/\d/,
								" ",
								"(",
								/\d/,
								/\d/,
								/\d/,
								")",
								" ",
								/\d/,
								/\d/,
								/\d/,
								"-",
								/\d/,
								/\d/,
								"-",
								/\d/,
								/\d/,
							],
							guide: true,
						},
					}}
				/>
			)}
		/>
	);
}
