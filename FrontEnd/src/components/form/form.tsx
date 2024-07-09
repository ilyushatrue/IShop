import { useEffect, useMemo, useRef } from "react";
import FormBuilder, { TFormBuilderRef } from "./form-builder";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { Grid, SxProps } from "@mui/material";
import Button from "../button";

type Action = {
	disabled?: boolean;
	label: string;
	type?: "reset" | "submit" | "button";
	onClick?: () => void;
	position: "center" | "left" | "right";
	sx?: SxProps;
};

export default function Form<T extends FieldValues>({
	defaultValues,
	fields,
	onSubmit,
	actions,
	minHeight,
	fullwidth = true,
	loading = false,
}: {
	defaultValues: DefaultValues<T>;
	onSubmit: (values: T) => void;
	fields: (builder: TFormBuilderRef<T>) => void;
	actions: (actions: Action[]) => Action[];
	minHeight: number | string;
	fullwidth?: boolean;
	loading?: boolean;
}) {
	const builderRef = useRef<TFormBuilderRef<T>>(null);
	const { handleSubmit, control, watch, formState, reset, getValues } =
		useForm<T>({
			mode: "onChange",
			reValidateMode: "onBlur",
			defaultValues,
		});
	const actionGroups = useMemo(() => {
		const actionList = actions([
			{
				disabled: !formState.isDirty || loading,
				label: "Отправить",
				type: "submit",
				position: "right",
				sx: {
					minwidth: "50%",
					textTransform: "none",
				},
			},
			{
				disabled: !formState.isDirty || loading,
				label: "Отменить",
				type: "reset",
				onClick: () => reset(),
				position: "left",
				sx: {
					minwidth: "50%",
					textTransform: "none",
				},
			},
		]);
		const groups = actionList.groupBy((x) => x.position);
		return groups;
	}, [actions, formState.isDirty, loading, reset]);

	useEffect(() => {
		const formValues = getValues();
		if (
			Object.keys(formValues).every(
				(key) => formValues[key] === defaultValues[key]
			)
		) {
			reset(defaultValues);
		}
	}, [defaultValues, getValues, reset]);

	useEffect(() => {
		fields(builderRef.current!);
	}, [fields]);

	return (
		<FormBuilder<T>
			watch={watch}
			control={control}
			handleSubmit={handleSubmit}
			fullwidth={fullwidth}
			onSubmit={onSubmit}
			minHeight={minHeight}
			loading={loading}
			ref={builderRef}
		>
			<Grid container display={"flex"} paddingY={"16px"}>
				<Grid
					item
					flex={1}
					display={"flex"}
					justifyContent={"start"}
					gap={1}
				>
					{actionGroups["left"]?.map((action, index) => (
						<Button
							key={index}
							disabled={action.disabled}
							type={action.type}
							sx={action.sx}
							onClick={action.onClick}
						>
							{action.label}
						</Button>
					))}
				</Grid>
				<Grid
					item
					flex={1}
					display={"flex"}
					justifyContent={"center"}
					gap={1}
				>
					{actionGroups["center"]?.map((action, index) => (
						<Button
							key={index}
							disabled={action.disabled}
							type={action.type}
							sx={action.sx}
							onClick={action.onClick}
						>
							{action.label}
						</Button>
					))}
				</Grid>
				<Grid
					item
					flex={1}
					display={"flex"}
					justifyContent={"end"}
					gap={1}
				>
					{actionGroups["right"]?.map((action, index) => (
						<Button
							key={index}
							disabled={action.disabled}
							type={action.type}
							sx={action.sx}
							onClick={action.onClick}
						>
							{action.label}
						</Button>
					))}
				</Grid>
			</Grid>
		</FormBuilder>
	);
}
