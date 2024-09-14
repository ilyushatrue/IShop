import { Snackbar, IconButton, SnackbarContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
	createContext,
	FC,
	ReactNode,
	SyntheticEvent,
	useCallback,
	useState,
} from "react";

type PopupType = "error" | "success";

interface PopupContextType {
	popupError: (message: string) => void;
	popupSuccess: (message: string) => void;
}

export const PopupContext = createContext<PopupContextType | undefined>(
	undefined
);

export const PopupProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState<PopupType>("success");

	const handleClick = (message: string, type: PopupType) => {
		setMessage(message);
		setType(type);
		setOpen(true);
	};

	const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
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

	const popupError = useCallback(
		(message: string) => handleClick(message, "error"),
		[]
	);
	const popupSuccess = useCallback(
		(message: string) => handleClick(message, "success"),
		[]
	);

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
