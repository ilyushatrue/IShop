import { ReactElement, useEffect, useRef } from "react";
import FormBuilder, { FormBuilderRef } from "./form-builder";
import { Control, FieldValues, UseFormWatch } from "react-hook-form";
import { Box, BoxProps } from "@mui/material";

export interface FormProps<T extends FieldValues> extends BoxProps {
	watch: UseFormWatch<T>;
	control: Control<T, any>;
	fields: (builder: FormBuilderRef<T>) => void;
	loading?: boolean;
	children?: ReactElement;
	onEnterKeyDown?: () => void;
}
export default function Form<T extends FieldValues>({
	control,
	watch,
	fields,
	loading = false,
	children,
	onEnterKeyDown,
	...props
}: FormProps<T>) {
	const builderRef = useRef<FormBuilderRef<T>>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		fields(builderRef.current!);
		const ref = boxRef.current;
		if (!onEnterKeyDown || !ref) return;
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			event.stopPropagation();
			if (event.key === "Enter") {
				if (ref!.contains(event.target as Node)) {
					event.stopPropagation();
					onEnterKeyDown();
				}
			}
		};

		ref.addEventListener("keydown", handleEnterKeyDown);

		return () => {
			if (!onEnterKeyDown || !ref) return;
			ref.removeEventListener("keydown", handleEnterKeyDown);
		};
	}, [fields, onEnterKeyDown]);

	return (
		<Box ref={boxRef} {...props}>
			<FormBuilder<T>
				watch={watch}
				control={control}
				loading={loading}
				ref={builderRef}
			>
				{children}
			</FormBuilder>
		</Box>
	);
}
