import {
	DialogProps as MuiDialogProps,
	Dialog as MuiDialog,
} from "@mui/material";
import { useEffect, useCallback, KeyboardEvent } from "react";
import { useMediaQueryContext } from "../app/infrastructure/media-query-context";

export type DialogProps = MuiDialogProps & {
	onEnterKeyPress?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};

function Dialog({ open, onEnterKeyPress, ...props }: DialogProps) {
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

	return <MuiDialog fullScreen={xs} {...props} open={open} />;
}

export default Dialog;
