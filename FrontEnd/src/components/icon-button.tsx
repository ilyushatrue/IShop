import { MouseEventHandler } from "react";
import Icon, { IIcon } from "./icon";
import { Box, Button, SxProps, Tooltip, TooltipProps } from "@mui/material";

interface IProps {
	iconName: IIcon["name"];
	tip?: TooltipProps["title"];
	onClick: MouseEventHandler<HTMLAnchorElement>;
	iconSx?: SxProps;
	buttonSx?: SxProps;
	caption?: string;
	orientation?: "vertical" | "horizontal";
	variant?: "rounded" | "squared" | "circled";
	fullwidth?: boolean;
	fontSize?: "inherit" | "large" | "medium" | "small";
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
	fullwidth,
	fontSize = "medium",
}: IProps) {
	return (
		<Tooltip title={tip}>
			<Button
				className="editIcon"
				onClick={onClick}
				href=""
				fullWidth={fullwidth}
				sx={{
					...buttonSx,
					display: "flex",
					justifyContent:"start",
					paddingX:2,
					typography: {
						textTransform: "none",
						fontWeight: 500,
					},
					borderRadius:
						variant === "rounded"
							? "16px"
							: variant === "circled"
							? "50%"
							: variant === "squared"
							? "0"
							: 0,
				}}
			>
				<Box
					display={"flex"}
					alignItems={"center"}
					columnGap={1}
					flexDirection={
						orientation === "horizontal" ? "row" : "column"
					}
				>
					<Icon
						name={iconName}
						sx={{ ...iconSx, color: "black",  }}
						fontSize={fontSize}
					/>
					<Box color={"black"}>{caption}</Box>
				</Box>
			</Button>
		</Tooltip>
	);
}
