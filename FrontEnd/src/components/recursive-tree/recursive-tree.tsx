import { Box, Divider, SxProps } from "@mui/material";
import { ReactNode, useState } from "react";

import RecursiveTreeRow from "./recursive-tree-row";
import RecursiveTreeHead from "./recursive-tree-head";
import { IRecursiveTreeActions } from "./recursive-tree-actions";

interface IRecursiveTree<T> {
    actionsColumn?: {
        actions: IRecursiveTreeActions<T>["actions"];
        headerTitle?: string;
        bodySx?: (defaultProps: SxProps) => SxProps;
        headerSx?: (defaultProps: SxProps) => SxProps;
    };
    tree: {
        minWidth: number;
        headerTitle: string;
        bodySx?: (defaultProps: SxProps) => SxProps;
        headerSx?: (defaultProps: SxProps) => SxProps;
        iconSize?: "large" | "medium" | "small";
        title: (item: T) => string;
        info: (item: T) => string;
        children: (item: T) => T[];
        icon: (item: T) => string;
        id: (item: T) => number | string;
        data: T[];
        indentIncrement?: number;
    };
    columns?: {
        headerTitle: string;
        value: (item: T) => string;
        bodySx?: (defaultProps: SxProps) => SxProps;
        headerSx?: (defaultProps: SxProps) => SxProps;
    }[];
    containerSx?: SxProps;
    row: { sx: SxProps; onClick?: (id: number | string) => void; height: number | string };
    headerSx?: SxProps;
    bodySx?: SxProps;
}
export default function RecursiveTree<T>({
    actionsColumn,
    columns,
    tree,
    headerSx,
    containerSx,
    bodySx,
    row,
}: IRecursiveTree<T>) {
    const [activeRowId, setActiveRowId] = useState<number | string>();

    function handleRowClick(id: number | string) {
        setActiveRowId(id);
    }

    function displayChildrenRecursively(items: T[], indent: number = 0, currentLevel: number = 0): ReactNode {
        currentLevel++;
        if (currentLevel === 1) {
            indent = 0;
        }
        const element = (
            <>
                {items.map((item, index) => {
                    return (
                        <Box key={index}>
                            <RecursiveTreeRow<T>
                                columns={columns?.map((column) => ({ value: column.value(item), sx: column.bodySx }))}
                                onClick={handleRowClick}
                                isActive={activeRowId === tree.id(item)}
                                branch={{
                                    sx: tree.bodySx,
                                    item: item,
                                    title: tree.title(item),
                                    info: tree.info(item),
                                    icon: tree.icon(item),
                                    id: tree.id(item),
                                    hasChildren: tree.children(item).length > 0,
                                    indent: indent,
                                    isCollapsed: true,
                                    iconSize: tree.iconSize,
                                    minWidth: tree.minWidth,
                                }}
                                actions={actionsColumn ? actionsColumn.actions : undefined}
                                sx={row.sx}
                                height={row.height}
                            >
                                {tree.children(item).length > 0 &&
                                    displayChildrenRecursively(
                                        tree.children(item),
                                        tree.indentIncrement ? indent + tree.indentIncrement : 0,
                                        currentLevel
                                    )}
                            </RecursiveTreeRow>
                            {index !== items.length - 1 && <Divider orientation="horizontal" />}
                        </Box>
                    );
                })}
            </>
        );
        currentLevel--;
        return element;
    }
    const nestedItems = displayChildrenRecursively(tree.data, tree.indentIncrement);
    return (
        <Box sx={containerSx}>
            <RecursiveTreeHead
                treeHeader={{ title: tree.headerTitle, sx: tree.headerSx, minWidth: tree.minWidth }}
                actionsHeader={
                    actionsColumn
                        ? {
                              width: actionsColumn.actions.width,
                              title: actionsColumn.headerTitle,
                              sx: actionsColumn.headerSx,
                          }
                        : undefined
                }
                columnHeaders={columns?.map((column) => ({ title: column.headerTitle, sx: column.headerSx }))}
                sx={{ ...row.sx, ...headerSx } as SxProps}
            />
            <Box sx={bodySx}>{nestedItems}</Box>
        </Box>
    );
}
