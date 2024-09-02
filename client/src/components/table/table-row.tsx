import { TableRow as MuiTableRow, TableRowProps } from "@mui/material";

export default function TableRow2({ hover = true, ...props }: TableRowProps) {
	return <MuiTableRow {...props} hover={hover} />;
}
