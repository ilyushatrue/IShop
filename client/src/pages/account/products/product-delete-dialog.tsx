import {
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
} from "@mui/material";
import Dialog from "../../../components/dialog";
import Actions from "../../../components/actions";

export default function ProductDeleteDialog({
	onDelete,
	loading,
	onClose,
	open,
}: {
	onDelete: () => void;
	loading: boolean;
	open: boolean;
	onClose: () => void;
}) {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Удалить товары</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Вы действительно хотите удалить выбранные товары?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Actions
					defaultActions={[
						{
							value: "Удалить",
							componentProps: {
								onClick: onDelete,
								disabled: loading,
							},
						},
						{
							value: "Отмена",
							position: "left",
							componentProps: {
								onClick: onClose,
								disabled: loading,
							},
						},
					]}
				/>
			</DialogActions>
		</Dialog>
	);
}
