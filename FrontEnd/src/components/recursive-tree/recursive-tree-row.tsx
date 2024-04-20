import { Box, Collapse, SxProps } from "@mui/material";
import { ReactNode, useState } from "react";

import RecursiveTreeBranch, { IRecursiveTreeBranch } from "./recursive-tree-branch";
import RecursiveTreeActions, { IRecursiveTreeActions } from "./recursive-tree-actions";

const defaultColumnSx: SxProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

interface IRecursiveTreeRow<T> {
    actions?: IRecursiveTreeActions<T>["actions"];
    isActive: boolean;
    branch: IRecursiveTreeBranch<T>;
    height?: number | string;
    columns?: { value: string; sx?: (defaultSx: SxProps) => SxProps }[];
    children: ReactNode;
    onClick: (id: number | string) => void;
    sx?: SxProps;
}
export default function RecursiveTreeRow<T>({
    actions,
    children,
    height = 50,
    sx,
    branch,
    onClick,
    isActive = false,
    columns,
}: IRecursiveTreeRow<T>) {
    const [isCollapsed, setIsCollapsed] = useState(branch.isCollapsed);
    function toggleCollapsed() {
        setIsCollapsed((prev) => !prev);
    }
    function handleMenuClick() {
        onClick(branch.id);
    }

    return (
        <>
            <Box
                onClick={branch.hasChildren ? toggleCollapsed : handleMenuClick}
                minHeight={height}
                sx={{
                    ...sx,
                    cursor: branch.hasChildren ? "pointer" : "default",
                    "&:hover": { bgcolor: isActive ? undefined : "whitesmoke" },
                }}
                bgcolor={isActive ? "rgb(235, 245, 255)" : undefined}
            >
                <Box
                    height={height}
                    display={"flex"}
                    alignItems={"center"}
                >
                    <RecursiveTreeBranch<T>
                        {...branch}
                        isCollapsed={isCollapsed}
                    />
                    {columns && (
                        <Box
                            display={"flex"}
                            flex={3}
                            height={"100%"}
                            overflow={"hidden"}
                        >
                            {columns.map((column, index) => (
                                <Box
                                    key={index}
                                    sx={column.sx ? column.sx(defaultColumnSx) : defaultColumnSx}
                                    flex={1}
                                    overflow={"hidden"}
                                    height={"100%"}
                                >
                                    {column.value}
                                </Box>
                            ))}
                        </Box>
                    )}
                    {actions && (
                        <RecursiveTreeActions
                            branch={branch}
                            actions={actions}
                        />
                    )}
                </Box>
            </Box>
            <Collapse
                unmountOnExit
                in={!isCollapsed}
            >
                {children}
            </Collapse>
        </>
    );
}
