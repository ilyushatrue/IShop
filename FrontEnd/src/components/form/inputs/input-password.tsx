import { IconButton, TextField } from "@mui/material";
import {
	Control,
	Controller,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import Icon from "../../icon";
import { useState } from "react";
import { IFormField } from "./form-field.interface";

export interface IFormPasswordField<T extends FieldValues>
	extends IFormField<T> {
	validationRequired?: boolean;
}

const getValidateOptions = <T extends FieldValues>(
	required: boolean
): RegisterOptions<T, Path<T>> => ({
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
	enabled = true,
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
			name={name}
			rules={
				validationRequired ? getValidateOptions(required) : undefined
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
					disabled={!enabled}
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
									<Icon name="visibility_off" />
								) : (
									<Icon name="visibility" />
								)}
							</IconButton>
						),
					}}
				>
					<Icon name="visibility" sx={{ height: 50, width: 50 }} />
				</TextField>
			)}
		/>
	);
}
