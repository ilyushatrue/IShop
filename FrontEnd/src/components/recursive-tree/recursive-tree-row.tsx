import { Box, Collapse, SxProps } from "@mui/material";
import { ReactNode, useState } from "react";
import RecursiveTreeBranch, { IRecursiveTreeBranch } from "./recursive-tree-branch";

interface IRecursiveTreeCell {
	flex?: number;
	width?: string | number;
	element: ReactNode;
}

interface IRecursiveTreeRow<T> {
	isActive: boolean;
	branch: IRecursiveTreeBranch<T>;
	height?: number | string;
	cellsRange?: {
		sx?: SxProps;
		width?: number | string;
		maxWidth?: number | string;
		minWidth?: number | string;
		flex?: number;
		cells: IRecursiveTreeCell[];
	};
	children?: ReactNode;
	onClick: (item: T) => void;
	onDoubleClick?: (item: T) => void;
	sx?: SxProps;
}
export default function RecursiveTreeRow<T>({
	children,
	height = 50,
	sx,
	branch,
	onClick,
	onDoubleClick,
	isActive = false,
	cellsRange,
}: IRecursiveTreeRow<T>) {
	const [isCollapsed, setIsCollapsed] = useState(branch.isCollapsed);
	function toggleCollapsed() {
		setIsCollapsed((prev) => !prev);
	}
	function handleMenuClick() {
		onClick(branch.item);
	}

	return (
		<>
			<Box
				onClick={branch.hasChildren ? toggleCollapsed : handleMenuClick}
				onDoubleClick={() => onDoubleClick?.(branch.item)}
				minHeight={height}
				sx={{
					...sx,
					cursor: branch.hasChildren ? "pointer" : "default",
					"&:hover": { bgcolor: isActive ? undefined : "whitesmoke" },
				}}
				bgcolor={isActive ? "rgb(235, 245, 255)" : undefined}
			>
				<Box minHeight={height} display={"flex"} alignItems={"center"}>
					<RecursiveTreeBranch<T>
						{...branch}
						isCollapsed={isCollapsed}
					/>
					{cellsRange && (
						<Box
							display={"flex"}
							height={"100%"}
							minHeight={height}
							overflow={"hidden"}
							flex={cellsRange.flex}
							width={cellsRange.width}
							maxWidth={cellsRange.maxWidth}
							minWidth={cellsRange.minWidth}
						>
							{cellsRange.cells.map((cell, index) => (
								<Box
									key={index}
									flex={cell.flex}
									width={cell.width}
									overflow={"hidden"}
									minHeight={height}
								>
									{cell.element}
								</Box>
							))}
						</Box>
					)}
				</Box>
			</Box>
			<Collapse unmountOnExit in={!isCollapsed}>
				{children}
			</Collapse>
		</>
	);
}
