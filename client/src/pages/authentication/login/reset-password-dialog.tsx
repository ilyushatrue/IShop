import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../../../components/form/form";
import {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import OutlinedButton from "../../../components/buttons/outlined-button";
import Button from "../../../components/buttons/button";
import Dialog from "../../../components/dialogs/dialog";

export default function ResetPasswordDialog({
	open,
	onSubmit,
	onClose,
}: {
	open: boolean;
	onSubmit: (values: { email: string }) => void;
	onClose: () => void;
}) {
	const defaultValues = { email: "" };
	const { handleSubmit, control, watch, reset } = useForm<{ email: string }>({
		mode: "onSubmit",
		reValidateMode: "onBlur",
		defaultValues: defaultValues,
	});

	const handleSubmitButtonClick: SubmitHandler<{ email: string }> = (
		values
	) => {
		onSubmit(values);
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Изменение пароля</DialogTitle>
			<DialogContent>
				<DialogContentText>
					На указанный адрес эл. почты будет отправлено сообщение на
					изменение пароля.
				</DialogContentText>
				<Form
					watch={watch}
					onEnterKeyDown={handleSubmit(handleSubmitButtonClick)}
					control={control}
					fields={(builder) =>
						builder.email({
							name: "email",
							required: true,
							variant: "standard",
						})
					}
				/>
			</DialogContent>
			<DialogActions>
				<OutlinedButton
					size="large"
					onClick={() => {
						reset();
						onClose();
					}}
				>
					Отмена
				</OutlinedButton>
				<Button
					size="large"
					onClick={handleSubmit(handleSubmitButtonClick)}
				>
					Добавить
				</Button>
			</DialogActions>
		</Dialog>
	);
}
