import { useForm } from "react-hook-form";
import Form from "../../../components/form/form";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import FormActions from "../../../components/form/form-actions";
import Dialog from "../../../components/dialog";

export default function ResetPasswordDialog({
	loading,
	open,
	onSubmit,
	onClose,
}: {
	loading: boolean;
	open: boolean;
	onSubmit: (values: { email: string }) => void;
	onClose: () => void;
}) {
	const defaultValues = { email: "" };
	const { handleSubmit, control, watch, reset } = useForm<{ email: string }>({
		mode: "onChange",
		reValidateMode: "onBlur",
		defaultValues: defaultValues,
	});
	return (
		<Dialog open={open}>
			<DialogTitle>Сброс пароля</DialogTitle>
			<DialogContent>
				<DialogContentText>Создайте новый пароль</DialogContentText>
				<Form
					watch={watch}
					control={control}
					fields={(builder) =>
						builder.email({ name: "email", required: true })
					}
				>
					<FormActions
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						reset={() => {
							reset();
							onClose();
						}}
						disabled={loading}
					/>
				</Form>
			</DialogContent>
		</Dialog>
		// <FormDialog2 open={open}>
		// 	<Form
		// 		handleSubmit={handleSubmit}
		// 		watch={watch}
		// 		control={control}
		// 		fields={(builder) =>
		// 			builder.email({ name: "email", required: true })
		// 		}
		// 		onSubmit={(val) => onSubmit(val.email)}
		// 	/>
		// </FormDialog2>

		// <FormDialog
		// 	dialogProps={{
		// 		title: "Изменение пароля",
		// 		content:
		// 			"На указанный адрес эл. почты будет отправлено сообщение на изменение пароля.",
		// 		open: open,
		// 		onClose: onClose,
		// 	}}
		// 	formProps={{
		// 		fullwidth: true,
		// 		defaultValues: { email: "" },
		// 		fields: (builder) =>
		// 			builder.email({ name: "email", required: true }),
		// 		loading: loading,
		// 		actions: ([submit]) => [
		// 			{
		// 				component: OutlinedButton,
		// 				value: "Отмена",
		// 				position: "left",
		// 				componentProps: {
		// 					onClick: onClose,
		// 				},
		// 			},
		// 			submit,
		// 		],
		// 		onSubmit: (values) => {
		// 			onSubmit(values.email);
		// 			onClose();
		// 		},
		// 		actionProps: {
		// 			position: "fixed",
		// 		},
		// 	}}
		// />
	);
}
