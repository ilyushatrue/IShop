import { Dialog } from "@mui/material";
import Form from "../../../components/form/form";

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
		<Dialog
			open={open}
			title={"Изменение пароля"}
			content={
				"На указанный адрес эл. почты будет отправлено сообщение на изменение пароля."
			}
			onClose={onClose}
		>
			<Form
				fullwidth
				defaultValues={{ email: "" }}
				fields={(builder) =>
					builder.email({ name: "email", required: true })
				}
				minHeight={80}
				loading={loading}
				actions={([submit]) => [
					{
						label: "Отмена",
						position: "left",
						onClick: onClose,
					},
					submit,
				]}
				onSubmit={(values) => onSubmit(values.email)}
			/>
		</Dialog>
	);
}
