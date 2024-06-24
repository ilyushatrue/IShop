import { Dialog as MuiDialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMemo } from "react";
import IconButton from "./icon-button";

function Dialog({
	open,
	onCancel,
	onAccept,
	title,
	content,
}: {
	open: boolean;
	title: string;
	content: string;
	onCancel?: () => void;
	onAccept?: () => void;
}) {
	const actions = useMemo(() => {
		const actionMap = {
			cancel: {
				title: "Отмена",
				name: "cancel",
				icon: "cancel",
				onClick: () => onCancel?.(),
			},
			accept: {
				title: "Да",
				name: "accept",
				icon: "done",
				onClick: () => onAccept?.(),
			},
		};
		return ["cancel", "accept"].map(
			(action) => actionMap[action as keyof typeof actionMap]
		);
	}, [onCancel, onAccept]);

	return (
		<MuiDialog open={open} onClose={() => onCancel?.()}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{actions.map(({ icon, onClick, title }, index) => (
					<IconButton
						key={index}
						iconName={icon}
						onClick={onClick}
						caption={title}
					/>
				))}
			</DialogActions>
		</MuiDialog>
	);
}

export default Dialog;
