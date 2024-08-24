import {
	DialogProps as MuiDialogProps,
	Dialog as MuiDialog,
} from "@mui/material";
import {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useEffect, useCallback, KeyboardEvent } from "react";
import Actions, { IAction } from "./actions";
import { useMediaQueryContext } from "../app/infrastructure/media-query-context";

export type DialogProps = MuiDialogProps & {
	actions?: (defaultActions: IAction[]) => IAction[];
	onEnterKeyPress?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};

function Dialog({
	actions,
	title,
	children,
	open,
	content,
	onEnterKeyPress,
	...props
}: DialogProps) {
	const { xs } = useMediaQueryContext();

	const handleEnterKeyPress = useCallback(
		(event: globalThis.KeyboardEvent) => {
			if (event.key === "Enter") {
				onEnterKeyPress!(
					event as unknown as KeyboardEvent<HTMLButtonElement>
				);
			}
		},
		[onEnterKeyPress]
	);

	useEffect(() => {
		if (!onEnterKeyPress) return;
		if (open) {
			window.addEventListener("keydown", handleEnterKeyPress);
		}
		return () => {
			window.removeEventListener("keydown", handleEnterKeyPress);
		};
	}, [handleEnterKeyPress, onEnterKeyPress, open]);

	return (
		<MuiDialog fullScreen={xs} {...props} open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
				{children}
			</DialogContent>
			{actions && (
				<DialogActions>
					<Actions actions={actions} />
				</DialogActions>
			)}
		</MuiDialog>
	);
}

export default Dialog;
