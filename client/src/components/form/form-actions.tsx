import { SxProps } from "@mui/material";
import Actions from "../actions";
import OutlinedButton from "../buttons/outlined-button";
import {
	FieldValues,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormReset,
} from "react-hook-form";

export default function FormActions<T extends FieldValues>({
	sx,
	disabled,
	onSubmit,
	reset,
	handleSubmit,
	submitText,
	resetText,
}: {
	sx?: SxProps;
	disabled?: boolean;
	onSubmit: (values: T) => void;
	reset: UseFormReset<T>;
	handleSubmit: UseFormHandleSubmit<T, undefined>;
	submitText?: string;
	resetText?: string;
}) {
	const handleSubmitButtonClicked: SubmitHandler<T> = (values) => {
		onSubmit(values);
	};

	console.log(disabled);
	return (
		<Actions
			sx={{ ...sx, marginTop: "16px" }}
			defaultActions={[
				{
					value: submitText ?? "Отправить",
					position: "right",
					componentProps: {
						disabled: disabled,
						size: "large",
						type: "submit",
						onClick: handleSubmit(handleSubmitButtonClicked),
					},
				},
				{
					component: OutlinedButton,
					value: resetText ?? "Отменить",
					position: "left",
					componentProps: {
						disabled: disabled,
						type: "reset",
						size: "large",
						onClick: () => reset(),
					},
				},
			]}
		/>
	);
}
