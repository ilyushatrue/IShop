import { DialogProps, Dialog as MuiDialog } from "@mui/material";
import {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useEffect, useCallback, KeyboardEvent } from "react";
import Actions, { IAction } from "./actions";

type DialogPropsEx = DialogProps & {
	actions?: (defaultActions: IAction[]) => IAction[];
	onOk: () => void;
	onEnterKeyPress: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};

function Dialog({
	actions,
	title,
	children,
	open,
	content,
	onOk,
	onEnterKeyPress,
	...props
}: DialogPropsEx) {
	const handleEnterKeyPress = useCallback(
		(event: globalThis.KeyboardEvent) => {
			if (event.key === "Enter") {
				onEnterKeyPress(
					event as unknown as KeyboardEvent<HTMLButtonElement>
				);
			}
		},
		[onEnterKeyPress]
	);

	useEffect(() => {
		if (open) {
			window.addEventListener("keydown", handleEnterKeyPress);
		}
		return () => {
			window.removeEventListener("keydown", handleEnterKeyPress);
		};
	}, [handleEnterKeyPress, open]);

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
