import { MouseEventHandler } from "react";
import Icon, { IIcon } from "./icon";
import { Box, Button, SxProps, Tooltip, TooltipProps } from "@mui/material";

export interface IIconButton {
	iconName: IIcon["name"];
	tip?: TooltipProps["title"];
	onClick: MouseEventHandler<HTMLAnchorElement>;
	iconSx?: SxProps;
	buttonSx?: SxProps;
	centered?: boolean;
	caption?: string;
	orientation?: "vertical" | "horizontal";
	variant?: "rounded" | "squared" | "circled";
	fullwidth?: boolean;
	fontSize?: number;
}
export default function IconButton({
	tip,
	iconName,
	onClick,
	iconSx,
	caption,
	buttonSx,
	orientation = "horizontal",
	variant = "rounded",
	centered,
	fullwidth,
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
					justifyContent: centered? "center" :"start",
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
					width: isCircled ? `calc(${fontSize}px + 8px)` : undefined, // fixed width for circular button
					height: isCircled ? `calc(${fontSize}px + 8px)` : undefined, // fixed height for circular button
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
						sx={{ ...iconSx, color: "black" }}
						fontSize={fontSize}
					/>
					{caption && <Box color={"black"}>{caption}</Box>}
				</Box>
			</Button>
		</Tooltip>
	);
}
