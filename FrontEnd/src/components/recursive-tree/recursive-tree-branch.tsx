import { Box, SxProps, Typography, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Icon from "../icon";

const ExpandMore = styled((props: { className?: string }) => (
	<ExpandMoreIcon className={props.className} />
))(({ theme, className }) => ({
	transform: className?.includes("expanded")
		? "rotate(180deg)"
		: "rotate(360deg)",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const defaultTreeSx: SxProps = {
	display: "flex",
	alignItems: "center",
	justifyContent: "start",
};

export interface IRecursiveTreeBranch<T> {
	id: string | number;
	item: T;
	title: string;
	info?: string;
	icon?: string;
	hasChildren: boolean;
	indent: number;
	isCollapsed: boolean;
	minWidth: number | string;
	width?: number | string;
	flex?: number;
	iconSize?: "large" | "medium" | "small";
	sx?: (defaultSx: SxProps) => SxProps;
}
export default function RecursiveTreeBranch<T>({
	title,
	info,
	hasChildren,
	minWidth,
	width,
	flex,
	icon,
	sx,
	iconSize = "medium",
	indent,
	isCollapsed,
}: IRecursiveTreeBranch<T>) {
	return (
		<Box
			sx={sx ? sx(defaultTreeSx) : defaultTreeSx}
			minWidth={minWidth}
			width={width}
			flex={flex}
			height={"100%"}
		>
			{hasChildren && (
				<ExpandMore
					sx={{ color: "grey", marginRight: 1 }}
					className={!isCollapsed ? "expanded" : ""}
				/>
			)}
			<Box
				display={"flex"}
				alignItems={"center"}
				overflow={"hidden"}
				width={"100%"}
				height={"100%"}
				gap={1}
				marginLeft={indent}
			>
				{icon && (
					<Icon
						fontSize={iconSize}
						name={icon}
						sx={{ color: "primary.light" }}
					/>
				)}
				<Box
					overflow={"hidden"}
					width={"100%"}
					fontSize={{ xs: 14, sm: 16 }}
					lineHeight={{ xs: 1, sm: 1.5 }}
				>
					{title}
					<Typography
						variant="body2"
						color={"grey"}
						marginTop={0.3}
						fontSize={{ xs: 13, sm: 14 }}
						noWrap
						overflow={"hidden"}
						textOverflow={"ellipsis"}
					>
						{info}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
