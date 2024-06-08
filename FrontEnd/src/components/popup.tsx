import * as React from "react";
import { Snackbar, IconButton, SnackbarContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type PopupType = "error" | "success";

interface PopupContextType {
	popupError: (message: string) => void;
	popupSuccess: (message: string) => void;
}

export const PopupContext = React.createContext<PopupContextType | undefined>(
	undefined
);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const [type, setType] = React.useState<PopupType>("success");

	const handleClick = (message: string, type: PopupType) => {
		setMessage(message);
		setType(type);
		setOpen(true);
	};

	const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const action = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);

	const popupError = (message: string) => handleClick(message, "error");
	const popupSuccess = (message: string) => handleClick(message, "success");

	return (
		<PopupContext.Provider value={{ popupError, popupSuccess }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<SnackbarContent
					message={message}
					action={action}
					style={{
						backgroundColor:
							type === "error" ? "#8c2626" : "#176e2b",
					}}
				/>
			</Snackbar>
		</PopupContext.Provider>
	);
};
