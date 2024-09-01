import {
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Dialog,
	DialogProps,
} from "@mui/material";
import Button from "./buttons/button";
import { MouseEvent } from "react";

export default function InfoDialog({
	okText = "Понятно",
	content,
	title,
	onOk,
	children,
	...props
}: DialogProps & {
	okText?: string;
	onOk: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
	return (
		<Dialog {...props}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
				{children}
			</DialogContent>
			<DialogActions>
				<Button onClick={onOk} autoFocus>
					{okText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
