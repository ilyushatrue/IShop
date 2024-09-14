import { SubmitHandler, useForm } from "react-hook-form";
import {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import OutlinedButton from "../../../components/buttons/outlined-button";
import Button from "../../../components/buttons/button";
import Dialog from "../../../components/dialogs/dialog";
import InputEmail from "../../../components/form/inputs/input-email";
import Form from "../../../components/form/form";

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
	const { handleSubmit, control, reset } = useForm<{ email: string }>({
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
				<Form onEnterKeyDown={handleSubmit(handleSubmitButtonClick)}>
					<InputEmail control={control} name="email" />
				</Form>
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
					Отправить
				</Button>
			</DialogActions>
		</Dialog>
	);
}
