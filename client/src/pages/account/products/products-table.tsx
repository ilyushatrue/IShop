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
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { ProductCategoryEnum } from "../../../api/enums/product-category.enum";

interface ITableValue {
	id: string;
	description: string;
	imageId: string;
	name: string;
}
export default function ProductsTable({
	title,
	rows,
	loading,
	onChange,
	onAdd,
	onDelete,
	onEdit,
	rowsPerPage: _rowsPerPage,
}: {
	title: string;
	rows: IProduct[];
	loading: boolean;
	rowsPerPage: number;
	onChange: (items: IProduct[]) => void;
	onDelete: (items: IProduct[]) => void;
	onEdit: (item: IProduct) => void;
	onAdd: () => void;
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
	const [orderBy, setOrderBy] = useState<keyof IProduct>("name");
	const [selected, setSelected] = useState<string[]>([]);
	const [dense, setDense] = useState<boolean>(false);
	const recordPairs = useMemo<[IProduct, ITableValue][]>(() => {
		return rows.map((row) => [
			row,
			{
				description: row.description,
				id: row.id,
				imageId: row.imageId,
				name: row.name,
			} as ITableValue,
		]);
	}, [rows]);

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

	const handleDoubleClick = (id: string) => (event: MouseEvent<unknown>) => {
		onEdit(rows.find((x) => x.id === id)!);
	};

	const handleClick = (id: string) => (event: MouseEvent<unknown>) => {
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
			recordPairs
				.map(([val, tableVal]) => val)
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.sort(getComparator(order, orderBy)),
		[order, orderBy, page, recordPairs, rowsPerPage]
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
				title={title}
				loading={loading}
			>
				<Stack direction={"row"} spacing={1}>
					<TooltipIconButton
						hidden={selected.length === 0}
						tooltip="Удалить"
						size={xs ? "small" : "medium"}
						disabled={loading}
						onClick={() =>
							onDelete(
								rows.filter((r) => selected.includes(r.id))
							)
						}
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
						onClick={onAdd}
					>
						add
					</TooltipIconButton>
				</Stack>
			</TableToolbar>
			<TableContainer>
				<Table size={dense ? "small" : "medium"}>
					<TableHead<IProduct>
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
									onDoubleClick={handleDoubleClick(row.id)}
									onClick={handleClick(row.id)}
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
										sx={{ mt: 2 }}
									>
										<Image
											imageId={row.imageId}
											size={dense ? 40 : 80}
										/>
									</TableCell>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										sx={{
											maxWidth: 200,
											whiteSpace: "normal",
											wordWrap: "break-word",
										}}
									>
										{row.description}
									</TableCell>
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
				labelRowsPerPage={"Показывать строк"}
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
