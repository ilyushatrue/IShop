import { Icon, IconButton, TextField } from "@mui/material";
import {
	Control,
	Controller,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import { useState } from "react";
import { IFormField } from "./form-field.interface";

export interface IFormPasswordField<T extends FieldValues>
	extends IFormField<T> {
	validationRequired?: boolean;
}

const getValidateOptions = <T extends FieldValues>(
	required: boolean
): Omit<
	RegisterOptions<T, Path<T>>,
	"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> => ({
	required: { value: required, message: "Обязательно для заполнения" },
	minLength: { value: 6, message: "Длина пароля не менее 6 символов" },
	validate: (value: string) => {
		if (!/(?=.*[0-9])/.test(value)) {
			return "Отсутствуют числа";
		}
		// if (!/(?=.*[!@#$%^&*])/.test(value)) {
		// 	return "Отсутствуют спецсимволы !@#$%^&*";
		// }
		// if (!/(?=.*[a-z])/.test(value)) {
		// 	return "Отсутствуют буквы в нижнем регистре";
		// }
		// if (!/(?=.*[A-Z])/.test(value)) {
		// 	return "Отсутствуют буквы в верхнем регистре";
		// }

		return true;
	},
});

export default function InputPassword<T extends FieldValues>({
	control,
	name,
	label = "Пароль",
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = true,
	disabled,
	readonly,
	validationRequired = true,
}: { control: Control<T> } & IFormPasswordField<T>) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleClickShowPassword = () => setIsPasswordVisible((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	return (
		<Controller
			key={name}
			control={control}
			name={name as Path<T>}
			rules={
				validationRequired ? getValidateOptions<T>(required) : undefined
			}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label + (required ? " *" : "")}
					size={size}
					variant={variant}
					type={isPasswordVisible ? "text" : "password"}
					margin={margin}
					fullWidth
					onChange={field.onChange}
					value={field.value}
					error={!!error}
					helperText={error && error.message}
					disabled={disabled}
					InputProps={{
						readOnly: readonly,
						endAdornment: (
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
								size="small"
							>
								{isPasswordVisible ? (
									<Icon>visibility_off</Icon>
								) : (
									<Icon>visibility</Icon>
								)}
							</IconButton>
						),
					}}
				/>
			)}
		/>
	);
}
