import OutlinedButton from "../../../components/buttons/outlined-button";
import FormDialog from "../../../components/form-dialog";

export default function ResetPasswordDialog({
	loading,
	open,
	onSubmit,
	onClose,
}: {
	loading: boolean;
	open: boolean;
	onSubmit: (email: string) => void;
	onClose: () => void;
}) {
	return (
		<FormDialog
			dialogProps={{
				title: "Изменение пароля",
				content:
					"На указанный адрес эл. почты будет отправлено сообщение на изменение пароля.",
				open: open,
				onClose: onClose,
			}}
			formProps={{
				fullwidth: true,
				defaultValues: { email: "" },
				fields: (builder) =>
					builder.email({ name: "email", required: true }),
				loading: loading,
				actions: ([submit]) => [
					{
						component: OutlinedButton,
						value: "Отмена",
						position: "left",
						componentProps: {
							onClick: onClose,
						},
					},
					submit,
				],
				onSubmit: (values) => {
					onSubmit(values.email);
					onClose();
				},
				actionProps: {
					position: "fixed",
				},
			}}
		/>
	);
}
