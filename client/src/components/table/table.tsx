import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";

import { IProduct } from "../../api/interfaces/product/product.interface";
import Image from "../image";
import TableHead, { Order } from "./table-head";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable({
	rows,
	loading,
	title,
	rowsPerPageOptions,
	page,
	rowsPerPage,
	onPageChange,
	onRowsPerPageChange,
	onSelect,
}: {
	rows: IProduct[];
	rowsPerPageOptions: number[];
	title: string;
	loading: boolean;
	page: number;
	rowsPerPage: number;
	onPageChange: (e: unknown, newPage: number) => void;
	onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSelect: (ids: string[]) => void;
}) {
	const { xs } = useMediaQueryContext();
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof IProduct>("name");
	const [selected, setSelected] = React.useState<string[]>([]);
	const [dense, setDense] = React.useState<boolean>(xs);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof IProduct
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		onSelect(newSelected);
		setSelected(newSelected);
	};

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	};

	const isSelected = (id: string) => selected.indexOf(id) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			rows
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.sort(getComparator(order, orderBy)),
		[order, orderBy, page, rows, rowsPerPage]
	);

	return (
		<Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>

			<TableBody>
				{/* {visibleRows.map((row, index) => {
					const isItemSelected = isSelected(row.id);
					const labelId = `enhanced-table-checkbox-${index}`;

				})} */}
				{emptyRows > 0 && (
					<TableRow
						style={{
							height: (dense ? 33 : 53) * emptyRows,
						}}
					>
						<TableCell colSpan={6} />
					</TableRow>
				)}
			</TableBody>
		</Table>

		// <FormControlLabel
		// 	sx={{ marginLeft: 1 }}
		// 	control={
		// 		<Switch checked={dense} onChange={handleChangeDense} />
		// 	}
		// 	label="Компактный вид"
		// />
	);
}
