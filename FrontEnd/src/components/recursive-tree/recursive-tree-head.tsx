import { Box, SxProps } from "@mui/material";

const commonSx: SxProps = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

const treeHeaderSx: SxProps = {
	...commonSx,
};

const columnHeadersSx: SxProps = {
	...commonSx,
	overflow: "hidden",
};

interface IRecursiveTreeHeader {
	flex?: number;
	width?: string | number;
	title?: string;
	sx?: (defaultSx: SxProps) => SxProps;
	minWidth?: number | string;
}

export interface IRecursiveTreeHead {
	treeHeader: IRecursiveTreeHeader;
	columnHeaders?: {
		flex?: number;
		width?: number;
		headers: IRecursiveTreeHeader[];
	};
	sx?: SxProps;
	height?: number | string;
}
export default function RecursiveTreeHead({
	columnHeaders,
	treeHeader,
	height = 60,
	sx,
}: IRecursiveTreeHead) {
	return (
		<Box display={"flex"} sx={sx} height={height}>
			<Box
				sx={treeHeader.sx ? treeHeader.sx(treeHeaderSx) : treeHeaderSx}
				flex={treeHeader.flex}
				minWidth={treeHeader.minWidth}
				width={treeHeader.width}
			>
				{treeHeader.title}
			</Box>
			{columnHeaders && (
				<Box
					display={"flex"}
					overflow={"hidden"}
					flex={columnHeaders.flex}
					width={columnHeaders.width}
				>
					{columnHeaders.headers.map((columnHeader, index) => (
						<Box
							key={index}
							flex={columnHeader.flex}
							width={columnHeader.width}
							sx={
								columnHeader.sx
									? columnHeader.sx(columnHeadersSx)
									: columnHeadersSx
							}
						>
							{columnHeader.title}
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
}
