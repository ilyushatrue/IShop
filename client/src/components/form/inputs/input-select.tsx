import {
	Box,
	Chip,
	FilledInput,
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	FormHelperText,
} from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IFormField } from "./form-field.interface";
import { ReactNode, useMemo } from "react";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";

export interface IFormSelectField<T extends FieldValues> extends IFormField<T> {
	options: { key: number | string; value: string }[];
	endAdornment?: ReactNode;
	multiple?: boolean;
}

export default function InputSelect<T extends FieldValues>({
	control,
	options,
	name,
	label,
	multiple,
	endAdornment,
	size,
	variant = "filled",
	margin = "dense",
	required = false,
	disabled,
	readonly,
}: { control: Control<T> } & IFormSelectField<T>) {
	const { xs } = useMediaQueryContext();
	size = size || (xs ? "small" : "medium");
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const optionsMap = useMemo(() => options.groupBy((o) => o.key), [options]);
	const MenuProps = useMemo(
		() => ({
			PaperProps: {
				style: {
					maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
					width: 250,
				},
			},
		}),
		[]
	);

	const inputVariantMapping: Record<string, JSX.Element> = {
		filled: <FilledInput />,
		outlined: <OutlinedInput label={label} />,
		standard: <Input />,
	};

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={{
				required: required ? "Обязательно для заполнения" : undefined,
			}}
			render={({ field, fieldState: { error } }) => (
				<FormControl
					fullWidth
					variant={variant}
					margin={margin}
					disabled={disabled}
					onBlur={field.onBlur}
					size={size}
					error={!!error}
				>
					<InputLabel>{label + (required ? " *" : "")}</InputLabel>
					<Select
						multiple={multiple}
						value={field.value || (multiple ? [] : "")}
						onChange={(e) => {
							field.onChange(e.target.value);
						}}
						input={inputVariantMapping[variant]}
						readOnly={readonly}
						endAdornment={endAdornment}
						renderValue={(selected) => (
							<Box
								sx={{
									display: "flex",
									flexWrap: "wrap",
									gap: 0.5,
								}}
							>
								{multiple
									? selected.map((value: number | string) => (
											<Chip
												key={value}
												label={
													optionsMap[value][0].value
												}
											/>
									  ))
									: optionsMap[selected as any][0].value}
							</Box>
						)}
						MenuProps={MenuProps}
					>
						{options.map((option) => (
							<MenuItem key={option.key} value={option.key}>
								{option.value}
							</MenuItem>
						))}
					</Select>
					{error && <FormHelperText>{error.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	);
}
