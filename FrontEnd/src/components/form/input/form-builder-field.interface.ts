import { Control, FieldValues } from "react-hook-form";
import { IFormField } from "./form-field.interface";

export interface IFormBuilderField<T extends FieldValues>
	extends IFormField<T> {
	control: Control<T>;
	errorMessage?: string;
}
