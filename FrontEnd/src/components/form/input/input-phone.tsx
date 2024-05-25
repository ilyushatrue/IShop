import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
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
export default function InputPhone<T extends FieldValues>({
	control,
	name,
	label = "Номер телефона",
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
					type="text"
					margin={margin}
					fullWidth
					onChange={field.onChange}
					value={field.value}
					error={!!errorMessage}
					helperText={errorMessage}
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
