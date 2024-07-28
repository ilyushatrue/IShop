import { Box, CircularProgress } from "@mui/material";
import IconButton from "../../../components/buttons/icon-button";

interface IProps {
	isLoading: boolean;
	onClick: () => void;
}
export default function MenuDeleteCell({ isLoading, onClick }: IProps) {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="end"
			height="100%"
		>
			{isLoading ? (
				<CircularProgress />
			) : (
				<IconButton
					iconName="delete"
					centered
					variant="circled"
					fontSize={21}
					color="red"
					onClick={(e) => {
						e.stopPropagation();
						onClick();
					}}
				/>
			)}
		</Box>
	);
}
