import {
	TableRow,
	TableHead as MuiTableHead,
	TableCell,
	Checkbox,
	TableSortLabel,
} from "@mui/material";
export type Order = "asc" | "desc";
interface EnhancedTableProps<T> {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof T
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	loading: boolean;
	headCells: HeadCell<T>[];
}

interface HeadCell<T> {
	id: keyof T;
	disablePadding: boolean;
	label: string;
	numeric: boolean;
}

export default function TableHead<T>({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
	headCells,
}: EnhancedTableProps<T>) {
	const createSortHandler =
		(property: keyof T) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<MuiTableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
					/>
				</TableCell>
				{headCells.map((headCell, index) => (
					<TableCell
						key={index}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</MuiTableHead>
	);
}
