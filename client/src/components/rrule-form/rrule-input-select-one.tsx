import {
	Box,
	FilledInput,
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	FormHelperText,
	FormControlOwnProps,
	SelectChangeEvent,
} from "@mui/material";
import { ReactNode, useMemo } from "react";

interface IFormSelectField {
	error: any;
	options: { key: number | string; value: string }[];
	endAdornment?: ReactNode;
	variant?: FormControlOwnProps["variant"];
	label?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	onChange?: (value: number) => void;
	value: number;
}

export default function RRuleInputSelectOne({
	onChange,
	options,
	label,
	variant = "outlined",
	endAdornment,
	required = false,
	disabled,
	readonly,
	error,
	value,
}: IFormSelectField) {
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;

	const MenuProps = useMemo(
		() => ({
			PaperProps: {
				sx: {
					maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
					width: 250,
					paddingX: "12px",
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

	const handleChange = (e: SelectChangeEvent<number>) => {
		onChange?.(e.target.value as number);
	};

	return (
		<FormControl
			fullWidth
			disabled={disabled}
			error={!!error}
			size="small"
			required={required}
		>
			<InputLabel>{label}</InputLabel>
			<Select
				value={value}
				onChange={handleChange}
				input={inputVariantMapping[variant]}
				readOnly={readonly}
				endAdornment={endAdornment}
				renderValue={(selected) => {
					return (
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 0.5,
							}}
						>
							{options.find((x) => x.key === selected)!.value}
						</Box>
					);
				}}
				MenuProps={MenuProps}
			>
				{options.map((option) => (
					<MenuItem
						sx={{
							display: "inline-block",
							whiteSpace: "nowrap",
							paddingX: "12px",
							marginRight: "4px",
							marginBottom: "4px",
							minHeight: "0px",
							borderRadius: "20px",
							bgcolor: "rgb(230,230,230)",
							fontSize: "13px",
							"&.Mui-selected": {
								bgcolor: "primary.main",
								color: "white",
							},
						}}
						key={option.key}
						value={option.key}
					>
						{option.value}
					</MenuItem>
				))}
			</Select>
			{error && <FormHelperText>{error.message}</FormHelperText>}
		</FormControl>
	);
}
