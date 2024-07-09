import { MouseEventHandler } from "react";
import Icon, { IIcon } from "./icon";
import {
	Box,
	Button,
	SxProps,
	Tooltip,
	TooltipProps,
	Typography,
} from "@mui/material";

export interface IIconButton {
	iconName: IIcon["name"];
	tip?: TooltipProps["title"];
	onClick: MouseEventHandler<HTMLAnchorElement>;
	iconSx?: SxProps;
	color?: string;
	buttonSx?: SxProps;
	centered?: boolean;
	caption?: string;
	orientation?: "vertical" | "horizontal";
	variant?: "rounded" | "squared" | "circled";
	fullwidth?: boolean;
	fontSize?: number;
	containerSized?: boolean;
}
export default function IconButton({
	tip,
	iconName,
	onClick,
	iconSx,
	caption,
	color = "black",
	buttonSx,
	orientation = "horizontal",
	variant = "rounded",
	centered,
	fullwidth,
	containerSized,
	fontSize = 24,
}: IIconButton) {
	const isCircled = variant === "circled";
	return (
		<Tooltip title={tip}>
			<Button
				className="editIcon"
				onClick={onClick}
				href=""
				fullWidth={fullwidth && !isCircled}
				sx={{
					...buttonSx,
					display: "flex",
					minWidth: fontSize,
					justifyContent: centered ? "center" : "start",
					typography: {
						textTransform: "none",
						fontWeight: 500,
					},
					borderRadius:
						variant === "rounded"
							? "16px"
							: isCircled
							? "50%"
							: variant === "squared"
							? "0"
							: 0,
					width: containerSized
						? "100%"
						: isCircled
						? `calc(${fontSize}px + 8px)`
						: undefined,
					height: containerSized
						? "100%"
						: isCircled
						? `calc(${fontSize}px + 8px)`
						: undefined,
				}}
			>
				<Box
					display={"flex"}
					alignItems={"center"}
					justifyContent={centered ? "center" : undefined}
					columnGap={1}
					flexDirection={
						orientation === "horizontal" ? "row" : "column"
					}
				>
					<Icon
						name={iconName}
						sx={{ ...iconSx, color: color }}
						fontSize={fontSize}
					/>
					{caption && <Typography fontSize={"inherit"} color={color}>{caption}</Typography>}
				</Box>
			</Button>
		</Tooltip>
	);
}
