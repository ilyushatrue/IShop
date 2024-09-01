import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import TableToolbar from "../../../components/table/table-toolbar";
import { ChangeEvent, MouseEvent, useMemo, useRef, useState } from "react";
import TableHead, { Order } from "../../../components/table/table-head";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";
import IconButton2 from "../../../components/buttons/icon-button-2";
import Image from "../../../components/image";
import { getComparator } from "../../../components/table/table";

export default function FavoriteProductsTable({
	rows,
	loading,
	onChange,
}: {
	rows: IProduct[];
	loading: boolean;
	onChange: (items: IProduct[]) => void;
}) {
	const { xs } = useMediaQueryContext();
	const rowsPerPageOptions = [10, 25, 100];
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<keyof IProduct>("name");
	const [selected, setSelected] = useState<string[]>([]);
	const [dense, setDense] = useState<boolean>(xs);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof IProduct
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
				title={"title"}
				loading={loading}
			>
				{selected.length > 0 ? (
					<Typography
						sx={{ flex: "1 1 100%" }}
						color="inherit"
						variant="subtitle1"
						component="div"
					>
						{selected.length} выбрано
					</Typography>
				) : (
					<Typography
						sx={{ flex: "1 1 100%" }}
						variant="h6"
						id="tableTitle"
						component="div"
						fontSize={18}
					>
						{"title"}
					</Typography>
				)}
				<Box>
					<IconButton2>edit</IconButton2>
				</Box>
				{/* <Actions
				actions={actions}
				defaultActions={[
					{
						value: "delete",
						tooltip: "Удалить",
						componentProps: {
							disabled: loading,
							size: xs ? "small" : "medium",
						},
						display: numSelected > 0 ? "flex" : "none",
						component: IconButton2,
					},
					{
						value: "edit",
						tooltip: "Редактировать",
						componentProps: {
							disabled: loading,
							size: xs ? "small" : "medium",
						},
						display: numSelected === 1 ? "flex" : "none",
						component: IconButton2,
					},
					{
						value: "add",
						componentProps: {
							disabled: loading,
							size: xs ? "small" : "medium",
						},
						tooltip: "Добавить",
						display: numSelected > 0 ? "none" : "flex",
						component: IconButton2,
					},
					{
						value: "filter_list",
						tooltip: "Фильтр",
						componentProps: {
							disabled: loading,
							size: xs ? "small" : "medium",
						},
						display: numSelected > 0 ? "none" : "flex",
						component: IconButton2,
					},
				]}
			/> */}
			</TableToolbar>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
					<TableHead<IProduct>
						headCells={[]}
						loading={loading}
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
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<TableRow
									hover
									onClick={(event) =>
										handleClick(event, row.id)
									}
									role="checkbox"
									tabIndex={-1}
									key={row.id}
									selected={isItemSelected}
									sx={{ cursor: "pointer", height: 40 }}
								>
									<TableCell padding="checkbox">
										<Checkbox
											color="primary"
											checked={isItemSelected}
										/>
									</TableCell>
									<TableCell>
										<Image imageId={row.imageId} />
									</TableCell>
									<TableCell
										component="th"
										id={labelId}
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
									height: (dense ? 33 : 53) * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
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
