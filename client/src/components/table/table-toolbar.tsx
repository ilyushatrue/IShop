import { alpha, Box, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";

interface EnhancedTableToolbarProps {
	numSelected: number;
	title: string;
	loading: boolean;
	children: ReactNode;
}

export default function TableToolbar({
	numSelected,
	title,
	children,
}: EnhancedTableToolbarProps) {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} выбрано
				</Typography>
			) : (
				<Typography
					sx={{ flex: "1 1 100%" }}
					variant="h6"
					id="tableTitle"
					component="div"
					fontSize={18}
				>
					{title}
				</Typography>
			)}
			{children}
		</Toolbar>
	);
}
