import IconButton2 from "./icon-button-2";
import { Box, ButtonProps, Tooltip } from "@mui/material";

export default function TooltipIconButton({
	children,
	size = "medium",
	tooltip,
	hidden,
	...props
}: ButtonProps & { tooltip: string }) {
	return (
		<Box sx={{ display: hidden ? "none" : "inherit" }}>
			<Tooltip title={tooltip}>
				<Box>
					<IconButton2 {...props} size={size}>
						{children}
					</IconButton2>
				</Box>
			</Tooltip>
		</Box>
	);
}
