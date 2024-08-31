import { CSSProperties, ReactElement, useEffect, useRef } from "react";
import FormBuilder, { FormBuilderRef } from "./form-builder";
import { Control, FieldValues, UseFormWatch } from "react-hook-form";

export interface FormProps<T extends FieldValues> {
	watch: UseFormWatch<T>;
	control: Control<T, any>;
	fields: (builder: FormBuilderRef<T>) => void;
	loading?: boolean;
	style?: CSSProperties;
	children?: ReactElement;
}
export default function Form<T extends FieldValues>({
	control,
	watch,
	fields,
	loading = false,
	style,
	children,
}: FormProps<T>) {
	const builderRef = useRef<FormBuilderRef<T>>(null);

	useEffect(() => {
		fields(builderRef.current!);
	}, [fields]);

	return (
		<FormBuilder<T>
			watch={watch}
			control={control}
			loading={loading}
			ref={builderRef}
			style={style}
		>
			{children}
		</FormBuilder>
	);
}
