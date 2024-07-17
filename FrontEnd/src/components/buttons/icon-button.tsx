import { MouseEventHandler } from "react";
import { Box, Button, Icon, SxProps, Tooltip, Typography } from "@mui/material";

export interface IIconButton {
	iconName: string;
	tooltip?: string;
	disabled?: boolean;
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
	tooltip,
	iconName,
	onClick,
	disabled,
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
		<Tooltip title={tooltip}>
			<Button
				className="editIcon"
				onClick={onClick}
				disabled={disabled}
				href=""
				fullWidth={fullwidth && !isCircled}
				sx={{
					...buttonSx,
					display: "flex",
					minWidth: fontSize,
					justifyContent: centered ? "center" : "start",
					typography: {
						textTransform: "none",
					},
					borderRadius:
						variant === "rounded"
							? "10px"
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
					<Icon sx={{ ...iconSx, color: color, fontSize: fontSize }}>
						{iconName}
					</Icon>
					{caption && (
						<Typography fontSize={fontSize * 0.6} color={color}>
							{caption}
						</Typography>
					)}
				</Box>
			</Button>
		</Tooltip>
	);
}
