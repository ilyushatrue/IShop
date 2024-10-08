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

const getValidateOptions = <T extends FieldValues>(
	required: boolean
): Omit<
	RegisterOptions<T, Path<T>>,
	"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> => ({
	required: { value: required, message: "Обязательно для заполнения" },
	validate: (value: string) =>
		value.includes("@") || "Email должен содержать @",
});

export default function InputEmail<T extends FieldValues>({
	control,
	name,
	label = "Эл. почта",
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
					type="email"
					variant={variant}
					margin={margin}
					disabled={disabled}
					InputProps={{ readOnly: readonly }}
					autoComplete="email"
					onBlur={field.onBlur}
					onChange={field.onChange}
					fullWidth
					value={field.value}
					error={!!error}
					helperText={error && error.message}
				/>
			)}
		/>
	);
}
