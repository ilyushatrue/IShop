import { DialogProps, Dialog as MuiDialog } from "@mui/material";

export default function Dialog({ ...props }: DialogProps) {
	return <MuiDialog {...props} disableScrollLock />;
}
