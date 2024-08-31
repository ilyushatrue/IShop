import {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import Dialog from "../../../components/dialog";
import Actions from "../../../components/actions";
import OutlinedButton from "../../../components/buttons/outlined-button";

export default function CategoryDeleteDialog({
	onClose,
	open,
	onAccept,
}: {
	onClose: () => void;
	open: boolean;
	onAccept: () => void;
}) {
	return (
		<Dialog onEnterKeyPress={onAccept} onClose={onClose} open={open}>
			<DialogTitle>Вы уверены?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Вы действительно хотите удалить категорию?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Actions
					defaultActions={[
						{
							value: "Нет",
							position: "left",
							component: OutlinedButton,
							componentProps: {
								onClick: onClose,
							},
						},
						{
							value: "Да",
							componentProps: {
								onClick: onAccept,
							},
						},
					]}
				/>
			</DialogActions>
		</Dialog>
	);
}
