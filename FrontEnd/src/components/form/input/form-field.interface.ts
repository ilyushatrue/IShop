import { Control, FieldValues, Path } from "react-hook-form";

export interface IFormField<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	errorMessage?: string;
	label?: string;
}
