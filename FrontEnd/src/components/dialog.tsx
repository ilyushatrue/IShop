import { DialogProps, Dialog as MuiDialog } from "@mui/material";
import {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useEffect, useCallback } from "react";
import Actions, { IAction } from "./actions";

function Dialog({
	actions,
	title,
	children,
	open,
	content,
	onOk,
	...props
}: DialogProps & {
	actions?: (defaultActions: IAction[]) => IAction[];
	onOk?: () => void;
}) {
	const handleEnterKeyPress = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Enter") {
				onOk?.();
			}
		},
		[onOk]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleEnterKeyPress);
		return () => {
			window.removeEventListener("keydown", handleEnterKeyPress);
		};
	}, [handleEnterKeyPress]);

	return (
		<MuiDialog {...props} open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
				{children}
			</DialogContent>
			{actions && (
				<DialogActions>
					<Actions
						defaultActions={[
							{
								label: "Понятно",
								position: "right",
								onClick: onOk,
							},
						]}
						actions={actions}
					/>
				</DialogActions>
			)}
		</MuiDialog>
	);
}

export default Dialog;
