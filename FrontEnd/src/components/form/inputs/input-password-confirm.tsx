import { Icon, IconButton, TextField } from "@mui/material";
import {
	Control,
	Controller,
	FieldValues,
	Path,
	PathValue,
	RegisterOptions,
} from "react-hook-form";
import { useState } from "react";
import { IFormField } from "./form-field.interface";

const getValidateOptions = <T extends FieldValues>(
	required: boolean,
	password: string
): RegisterOptions<T, Path<T>> => ({
	required: { value: required, message: "Обязательно для заполнения" },
	validate: (value: string) => {
		if (value !== password) {
			return "Пароли не совпадают";
		}
		return true;
	},
});

export default function InputPasswordConfirm<T extends FieldValues>({
	control,
	name,
	label = "Пароль",
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = true,
	onChange,
	readonly,
	disabled,
}: {
	control: Control<T>;
	onChange: () => PathValue<T, Path<T>>;
} & IFormField<T>) {
	const [password, setPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleClickShowPassword = () => setIsPasswordVisible((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleOnChange = () => {
		if (onChange) {
			setPassword(onChange());
		}
	};

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={getValidateOptions(required, password)}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label + (required ? " *" : "")}
					size={size}
					variant={variant}
					type={isPasswordVisible ? "text" : "password"}
					margin={margin}
					fullWidth
					onChange={(e) => {
						field.onChange(e);
						handleOnChange();
					}}
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
									<Icon>visibility_off</Icon>
								)}
							</IconButton>
						),
					}}
				>
					<Icon sx={{ height: 50, width: 50 }}>visibility</Icon>
				</TextField>
			)}
		/>
	);
}
