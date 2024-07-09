import { Box, DialogProps, Dialog as MuiDialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMemo } from "react";
import Button from "./button";

function Dialog({
	onCancel,
	onAccept,
	title,
	children,
	content,
	...props
}: DialogProps & {
	onCancel?: () => void;
	onAccept?: () => void;
}) {
	const actions = useMemo(() => {
		const actionMap: any = {};
		if (onCancel) {
			actionMap.cancel = {
				title: "Нет",
				name: "cancel",
				icon: "cancel",
				onClick: onCancel,
			};
		}
		if (onAccept) {
			actionMap.accept = {
				title: "Да",
				name: "accept",
				icon: "done",
				onClick: onAccept,
			};
		}
		return Object.keys(actionMap).map(
			(action) => actionMap[action as keyof typeof actionMap]
		);
	}, [onCancel, onAccept]);

	return (
		<MuiDialog {...props} onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<Box sx={{ px: 3 }}>{children}</Box>
			<DialogActions>
				{actions.map(({ icon, onClick, title }, index) => (
					<Button onClick={onClick}>{title}</Button>
				))}
			</DialogActions>
		</MuiDialog>
	);
}

export default Dialog;
