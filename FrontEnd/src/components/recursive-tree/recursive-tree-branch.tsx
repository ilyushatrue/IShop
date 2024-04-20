import { Box, SxProps, Typography, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Icon, { IconType } from "../icon";

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
	flex: 1.5,
};

export interface IRecursiveTreeBranch<T> {
	id: string | number;
	item: T;
	title: string;
	info: string;
	icon: string;
	hasChildren: boolean;
	indent: number;
	isCollapsed: boolean;
	minWidth: number;
	iconSize?: "large" | "medium" | "small";
	sx?: (defaultSx: SxProps) => SxProps;
}
export default function RecursiveTreeBranch<T>({
	title,
	info,
	hasChildren,
	minWidth,
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
				height={"100%"}
				gap={1}
				marginLeft={indent}
			>
				{icon && (
					<Icon
						fontSize={iconSize}
						name={icon as IconType}
						sx={{ color: "primary.light" }}
					/>
				)}
				<Box>
					{title}
					<Typography variant="body2" color={"grey"}>
						{info}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
