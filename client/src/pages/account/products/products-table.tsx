import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import TableToolbar from "../../../components/table/table-toolbar";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import TableHead, { Order } from "../../../components/table/table-head";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";
import Image from "../../../components/image";
import { getComparator } from "../../../components/table/table";
import { Stack } from "@mui/material";
import TooltipIconButton from "../../../components/buttons/tooltip-button";

interface ITableValue {
	id: string;
	description: string;
	imageId: string;
	name: string;
}
export default function ProductsTable({
	rows,
	loading,
	onChange,
	onAdd,
	onDelete,
	onEdit,
	rowsPerPage: _rowsPerPage,
}: {
	rows: ITableValue[];
	loading: boolean;
	rowsPerPage: number;
	onChange: (items: ITableValue[]) => void;
	onDelete: (items: ITableValue[]) => void;
	onEdit: (item: ITableValue) => void;
	onAdd: (item: ITableValue) => void;
}) {
	const defaultValue: ITableValue = {
		id: "",
		description: "",
		imageId: "",
		name: "",
	};
	const rowsPerPageOptions = [10, 25, 100];
	const { xs } = useMediaQueryContext();
	const [rowsPerPage, setRowsPerPage] = useState(_rowsPerPage);
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<keyof ITableValue>("name");
	const [selected, setSelected] = useState<string[]>([]);
	const [dense, setDense] = useState<boolean>(xs);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof ITableValue
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: MouseEvent<unknown>, id: string) => {
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
		setSelected(newSelected);
	};

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	};

	const isSelected = (id: string) => selected.indexOf(id) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = useMemo(
		() =>
			rows
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.sort(getComparator(order, orderBy)),
		[order, orderBy, page, rows, rowsPerPage]
	);

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	return (
		<Box>
			<TableToolbar
				numSelected={selected.length}
				title={"Избранное"}
				loading={loading}
			>
				<Stack direction={"row"} spacing={1}>
					<TooltipIconButton
						hidden={selected.length > 0}
						tooltip="Удалить"
						size={xs ? "small" : "medium"}
						disabled={loading}
						onClick={() => onDelete(rows)}
					>
						delete
					</TooltipIconButton>
					<TooltipIconButton
						hidden={selected.length !== 1}
						tooltip="Редактировать"
						size={xs ? "small" : "medium"}
						disabled={loading}
						onClick={() =>
							onEdit(rows.find((r) => r.id === selected[0])!)
						}
					>
						edit
					</TooltipIconButton>
					<TooltipIconButton
						tooltip="Добавить"
						size={xs ? "small" : "medium"}
						disabled={loading}
						onClick={() => onAdd(rows[0])}
					>
						add
					</TooltipIconButton>
				</Stack>
			</TableToolbar>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
					<TableHead<ITableValue>
						headCells={[
							{
								id: "imageId",
								disablePadding: false,
								label: "Изображение",
								numeric: false,
							},
							{
								id: "name",
								disablePadding: false,
								label: "Наименование",
								numeric: false,
							},
							{
								id: "description",
								disablePadding: false,
								label: "Описание",
								numeric: false,
							},
						]}
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
					/>
					<TableBody>
						{visibleRows.map((row, index) => {
							const isItemSelected = isSelected(row.id);

							return (
								<TableRow
									hover
									onClick={(event) =>
										handleClick(event, row.id)
									}
									tabIndex={-1}
									key={row.id}
									selected={isItemSelected}
									sx={{
										cursor: "pointer",
										height: dense ? 50 : 100,
									}}
								>
									<TableCell padding="checkbox">
										<Checkbox
											color="primary"
											checked={isItemSelected}
										/>
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										padding="none"
									>
										<Image
											imageId={row.imageId}
											size={dense ? 40 : 80}
										/>
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										padding="none"
									>
										{row.name}
									</TableCell>
									<TableCell>{row.description}</TableCell>
								</TableRow>
							);
						})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: (dense ? 50 : 100) * emptyRows,
								}}
							>
								<TableCell
									colSpan={
										Object.keys(defaultValue).length - 1
									}
								/>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={rowsPerPageOptions}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelRowsPerPage={"Строк на странице"}
			/>
			<FormControlLabel
				sx={{ marginLeft: 1 }}
				control={
					<Switch checked={dense} onChange={handleChangeDense} />
				}
				label="Компактный вид"
			/>
		</Box>
	);
}
