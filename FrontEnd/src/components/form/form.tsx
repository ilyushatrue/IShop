import { useEffect, useRef } from "react";
import FormBuilder, { TFormBuilderRef } from "./form-builder";
import { DefaultValues, FieldValues } from "react-hook-form";

export default function Form<T extends FieldValues>({
	defaultValues,
	fields,
	onSubmit,
	submitButtonText = "Отправить",
}: {
	defaultValues: DefaultValues<T>;
	onSubmit: (values: T) => void;
	fields: (builder: TFormBuilderRef<T>) => void;
	submitButtonText?: string;
}) {
	const builderRef = useRef<TFormBuilderRef<T>>(null);

	useEffect(() => {
		fields(builderRef.current!);
	}, [fields]);

	return (
		<FormBuilder<T>
			submitButtonText={submitButtonText}
			defaultValues={defaultValues}
			onSubmit={onSubmit}
			ref={builderRef}
		/>
	);
}
