import { Fab as MuiFab, FabProps } from "@mui/material";

export default function Fab({ ...props }: FabProps) {
	return (
		<MuiFab {...props} sx={{ position: "fixed", bottom: 20, right: 20 }} />
	);
}
