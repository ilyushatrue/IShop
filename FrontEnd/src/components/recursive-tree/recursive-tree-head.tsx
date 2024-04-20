import { Box, SxProps } from "@mui/material";

const commonSx: SxProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const treeHeaderSx: SxProps = {
    ...commonSx,
    flex: 1.5,
};

const columnHeadersSx: SxProps = {
    ...commonSx,
    flex: 1,
    overflow: "hidden",
};

export interface IRecursiveTreeHead {
    treeHeader: { minWidth: number; title: string; sx?: (defaultSx: SxProps) => SxProps };
    actionsHeader?: { width: number; title?: string; sx?: (defaultSx: SxProps) => SxProps };
    columnHeaders?: { title: string; sx?: (defaultSx: SxProps) => SxProps }[];
    sx?: SxProps;
    height?: number | string;
}
export default function RecursiveTreeHead({
    columnHeaders,
    treeHeader,
    height = 60,
    sx,
    actionsHeader,
}: IRecursiveTreeHead) {
    return (
        <Box
            display={"flex"}
            sx={sx}
            height={height}
        >
            <Box
                sx={treeHeader.sx ? treeHeader.sx(treeHeaderSx) : treeHeaderSx}
                minWidth={treeHeader.minWidth}
            >
                {treeHeader.title}
            </Box>
            {columnHeaders && (
                <Box
                    display={"flex"}
                    flex={3}
                    overflow={"hidden"}
                >
                    {columnHeaders.map((columnHeader, index) => (
                        <Box
                            key={index}
                            sx={columnHeader.sx ? columnHeader.sx(columnHeadersSx) : columnHeadersSx}
                        >
                            {columnHeader.title}
                        </Box>
                    ))}
                </Box>
            )}
            {actionsHeader && (
                <Box
                    width={actionsHeader.width}
                    sx={actionsHeader.sx ? actionsHeader.sx({ ...commonSx }) : undefined}
                >
                    {actionsHeader.title}
                </Box>
            )}
        </Box>
    );
}
