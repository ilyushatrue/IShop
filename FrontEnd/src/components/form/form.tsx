import { useEffect, useRef } from "react";
import FormBuilder, { TFormBuilderRef } from "./form-builder";
import { DefaultValues, FieldValues } from "react-hook-form";
import { Box } from "@mui/material";
import Button from "../button";

export default function Form<T extends FieldValues>({
	defaultValues,
	fields,
	onSubmit,
	onReset,
	submitButtonText = "Отправить",
	resetButtonText,
	minHeight,
	fullwidth = true,
	loading = false,
}: {
	defaultValues: DefaultValues<T>;
	onSubmit: (values: T) => void;
	onReset?: () => void;
	fields: (builder: TFormBuilderRef<T>) => void;
	resetButtonText?: string;
	submitButtonText?: string;
	minHeight: number | string;
	fullwidth?: boolean;
	loading?: boolean;
}) {
	const builderRef = useRef<TFormBuilderRef<T>>(null);

	useEffect(() => {
		fields(builderRef.current!);
	}, [fields]);

	return (
		<FormBuilder<T>
			fullwidth={fullwidth}
			defaultValues={defaultValues}
			onSubmit={onSubmit}
			minHeight={minHeight}
			loading={loading}
			ref={builderRef}
		>
			<Box
				style={{
					display: "flex",
					justifyContent: onReset ? "space-between" : "center",
					width: "100%",
				}}
			>
				{onReset && (
					<Button
						type="reset"
						disabled={loading}
						onClick={onReset}
						variant="contained"
						sx={{
							minwidth: "50%",
							margin: "16px",
							textTransform: "none",
						}}
					>
						{resetButtonText}
					</Button>
				)}
				<Button
					type="submit"
					disabled={loading}
					variant="contained"
					sx={{
						minwidth: "50%",
						margin: "16px",
						textTransform: "none",
					}}
				>
					{submitButtonText}
				</Button>
			</Box>
		</FormBuilder>
	);
}
