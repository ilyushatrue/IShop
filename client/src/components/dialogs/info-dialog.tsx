import {
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	DialogProps,
} from "@mui/material";
import { MouseEvent } from "react";
import Button from "../buttons/button";
import Dialog from "./dialog";

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
