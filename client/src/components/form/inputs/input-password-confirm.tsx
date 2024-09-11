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
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";

const getValidateOptions = <T extends FieldValues>(
	required: boolean,
	password: string
): Omit<
	RegisterOptions<T, Path<T>>,
	"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> => ({
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
	password,
	label = "Подтвердите пароль",
	size,
	variant = "filled",
	margin = "dense",
	required = true,
	readonly,
	disabled,
}: {
	control: Control<T>;
	password: string;
} & IFormField<T>) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const { xs } = useMediaQueryContext();
	size = size || (xs ? "small" : "medium");

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
			rules={getValidateOptions<T>(required, password)}
			render={({ field, fieldState: { error } }) => (
				<TextField
					label={label + (required ? " *" : "")}
					size={size}
					variant={variant}
					type={isPasswordVisible ? "text" : "password"}
					margin={margin}
					fullWidth
					onChange={field.onChange}
					onBlur={field.onBlur}
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
								<Icon>
									{isPasswordVisible
										? "visibility_off"
										: "visibility"}
								</Icon>
							</IconButton>
						),
					}}
				/>
			)}
		/>
	);
}
