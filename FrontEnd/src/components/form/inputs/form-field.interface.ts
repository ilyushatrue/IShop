import { TextFieldVariants } from "@mui/material";
import { FieldValues, Path } from "react-hook-form";

export interface IFormField<T extends FieldValues> {
	name: Path<T>;
	label?: string;
	size?: "small" | "medium";
	variant?: TextFieldVariants;
	margin?: "dense" | "normal" | "none";
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
}
