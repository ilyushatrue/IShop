import { Box, Divider, SxProps } from "@mui/material";
import { ReactNode, useState } from "react";
import RecursiveTreeRow from "./recursive-tree-row";
import RecursiveTreeHead from "./recursive-tree-head";

export interface IRecursiveTreeColumn<T> {
	headerTitle?: string;
	cell: (item: T) => ReactNode;
	flex?: number;
	width?: number | string;
	headerSx?: (defaultProps: SxProps) => SxProps;
}

interface IRecursiveTree<T> {
	tree: {
		minWidth: number | string;
		width?: number | string;
		flex?: number;
		headerTitle: string;
		bodySx?: (defaultProps: SxProps) => SxProps;
		headerSx?: (defaultProps: SxProps) => SxProps;
		iconSize?: "large" | "medium" | "small";
		title: (item: T) => string;
		info?: (item: T) => string;
		children?: (item: T) => T[];
		icon?: (item: T) => string;
		id: (item: T) => number | string;
		data: T[];
		indentIncrement?: number;
	};
	columnsRange?: {
		sx?: SxProps;
		flex?: number;
		width?: number;
		maxWidth?: number | string;
		minWidth?: number | string;
		columns: IRecursiveTreeColumn<T>[];
	};
	containerSx?: SxProps;
	row: {
		sx: SxProps;
		onClick?: (item: T) => void;
		onDoubleClick?: (item: T) => void;
		height: number | string;
	};
	headerSx?: SxProps;
	bodySx?: SxProps;
}
export default function RecursiveTree<T>({
	columnsRange,
	tree,
	headerSx,
	containerSx,
	bodySx,
	row,
}: IRecursiveTree<T>) {
	const [activeRowId, setActiveRowId] = useState<number | string>();

	function handleRowClick(item: T) {
		setActiveRowId(tree.id(item));
		row.onClick?.(item);
	}

	function displayChildrenRecursively(
		items: T[],
		indent: number = 0,
		currentLevel: number = 0
	): ReactNode {
		currentLevel++;
		if (currentLevel === 1) {
			indent = 0;
		}
		const element = (
			<>
				{items.map((item, index) => {
					const hasChildren =
						tree.children !== undefined &&
						tree.children(item).length > 0;
					return (
						<Box key={index}>
							<RecursiveTreeRow<T>
								cellsRange={{
									sx: columnsRange?.sx,
									width: columnsRange?.width,
									flex: columnsRange?.flex,
									maxWidth: columnsRange?.maxWidth,
									minWidth: columnsRange?.minWidth,
									cells:
										columnsRange?.columns.map((column) => ({
											element: column.cell(item),
											flex: column.flex,
											width: column.width,
										})) ?? [],
								}}
								onClick={handleRowClick}
								onDoubleClick={
									hasChildren ? undefined : row.onDoubleClick
								}
								isActive={activeRowId === tree.id(item)}
								branch={{
									sx: tree.bodySx,
									flex: tree.flex,
									item: item,
									title: tree.title(item),
									info: tree.info?.(item),
									icon: tree.icon?.(item),
									id: tree.id(item),
									hasChildren: hasChildren,
									indent: indent,
									isCollapsed: true,
									iconSize: tree.iconSize,
									minWidth: tree.minWidth,
									width: tree.width,
								}}
								sx={row.sx}
								height={row.height}
							>
								{hasChildren &&
									displayChildrenRecursively(
										tree.children!(item),
										tree.indentIncrement
											? indent + tree.indentIncrement
											: 0,
										currentLevel
									)}
							</RecursiveTreeRow>
							{index !== items.length - 1 && (
								<Divider orientation="horizontal" />
							)}
						</Box>
					);
				})}
			</>
		);
		currentLevel--;
		return element;
	}
	const nestedItems = displayChildrenRecursively(
		tree.data,
		tree.indentIncrement
	);
	return (
		<Box sx={containerSx}>
			<RecursiveTreeHead
				treeHeader={{
					title: tree.headerTitle,
					flex: tree.flex,
					sx: tree.headerSx,
					minWidth: tree.minWidth,
					width: tree.width,
				}}
				columnHeaders={{
					flex: columnsRange?.flex,
					width: columnsRange?.width,
					headers:
						columnsRange?.columns?.map((column) => ({
							flex: column.flex,
							width: column.width,
							title: column.headerTitle,
							sx: column.headerSx,
						})) ?? [],
				}}
				sx={{ ...row.sx, ...headerSx } as SxProps}
			/>
			<Box sx={bodySx}>{nestedItems}</Box>
		</Box>
	);
}
