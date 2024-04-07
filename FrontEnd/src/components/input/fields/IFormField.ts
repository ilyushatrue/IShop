import { HTMLInputTypeAttribute } from "react";

export interface IFormField {
	label: string;
	name: string;
	placeholder: string;
	type?: HTMLInputTypeAttribute;
	isRequired?: boolean;
}