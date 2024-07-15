import { Box, CircularProgress } from "@mui/material";
import IconButton from "../../../components/icon-button";

interface IProps {
	isLoading: boolean;
	onClick: () => void;
}
export default function MenuEditCell({ isLoading, onClick }: IProps) {
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
					iconName={"edit"}
					centered
					variant="circled"
					fontSize={21}
					onClick={(e) => {
						e.stopPropagation();
						onClick();
					}}
				/>
			)}
		</Box>
	);
}
