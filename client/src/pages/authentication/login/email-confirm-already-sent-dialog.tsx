import { Dialog, Typography } from "@mui/material";
import ConfirmDialog from "../../../components/confirm-dialog";
import InfoDialog from "../../../components/info-dialog";

export default function EmailConfirmAlreadySentDialog({
	open,
	email = "",
	onClose,
	onEmailResendRequest,
}: {
	open: boolean;
	email?: string;
	onClose: () => void;
	onEmailResendRequest: (email: string) => void;
}) {
	return (
		<InfoDialog
			open={open}
			onOk={onClose}
			title={"Ожидание подтверждения эл. почты"}
			content={`На почту ${email} была отправлена ссылка на подтверждение учетной записи. Перейдите по ней.`}
			onClose={onClose}
			// actions={() => [
			// 	{
			// 		position: "right",
			// 		value: "Понятно",
			// 		componentProps: {
			// 			onClick: onClose,
			// 		},
			// 	},
			// ]}
		>
			<Typography
				onClick={() => onEmailResendRequest(email)}
				sx={{
					textDecoration: "underline",
					cursor: "pointer",
					color: "primary.main",
				}}
			>
				Или закажите новую ссылку для подтверждения
			</Typography>
		</InfoDialog>
	);
}
