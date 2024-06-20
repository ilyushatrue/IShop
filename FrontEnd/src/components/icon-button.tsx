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
}: IProps) {
	return (
		<Tooltip title={tip}>
			<Button
				className="editIcon"
				onClick={onClick}
				href=""
				sx={{
					...buttonSx,
					typography: {
						textTransform: "capitalize",
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
					flexDirection={
						orientation === "horizontal" ? "row" : "column"
					}
				>
					<Icon name={iconName} sx={{ ...iconSx, color: "black" }} />
					<Box color={"black"}>{caption}</Box>
				</Box>
			</Button>
		</Tooltip>
	);
}
