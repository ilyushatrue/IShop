import { IconButton, TextField } from "@mui/material";
import {
	Controller,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormWatch,
} from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";
import Icon2 from "../../icon";
import { useState } from "react";

const getValidateOptions = <T extends FieldValues>(
	password: string
): RegisterOptions<T, Path<T>> => ({
	required: "Обязательно для заполнения",
	validate: (value: string) => {
		if (value !== password) {
			return "Пароли не совпадают";
		}
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

export default function InputPasswordConfirm<T extends FieldValues>({
	watch,
	watchFor,
	control,
	name,
	label = "Пароль",
	size = "medium",
	variant = "filled",
	margin = "dense",
	required,
}: { watch: UseFormWatch<T>; watchFor: Path<T> } & IFormBuilderField<T>) {
	const password = watch(watchFor);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleClickShowPassword = () => setIsPasswordVisible((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<Controller
			control={control}
			name={name}
			rules={getValidateOptions(password)}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label}
					required={required}
					size={size}
					variant={variant}
					type={isPasswordVisible ? "text" : "password"}
					margin={margin}
					fullWidth
					onChange={field.onChange}
					value={field.value}
					error={!!error}
					helperText={error && error.message}
					InputProps={{
						endAdornment: (
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
								size="small"
							>
								{isPasswordVisible ? (
									<Icon2 name="visibility_off" />
								) : (
									<Icon2 name="visibility" />
								)}
							</IconButton>
						),
					}}
				>
					<Icon2 name="visibility" sx={{ height: 50, width: 50 }} />
				</TextField>
			)}
		/>
	);
}
