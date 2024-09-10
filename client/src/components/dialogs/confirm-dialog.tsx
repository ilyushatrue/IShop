import {
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	DialogProps,
} from "@mui/material";
import OutlinedButton from "../buttons/outlined-button";
import Button from "../buttons/button";
import { MouseEvent } from "react";
import Dialog from "./dialog";

export default function ConfirmDialog({
	confirmText = "Подтверждаю",
	cancelText = "Отмена",
	content,
	title,
	onConfirm,
	onClose,
	children,
	...props
}: Omit<DialogProps, "onClose"> & {
	cancelText?: string;
	confirmText?: string;
	onClose: (e: MouseEvent<HTMLButtonElement>) => void;
	onConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
	return (
		<Dialog {...props} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
				{children}
			</DialogContent>
			<DialogActions>
				<OutlinedButton onClick={onClose}>{cancelText}</OutlinedButton>
				<Button onClick={onConfirm} autoFocus>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
