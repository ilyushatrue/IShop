import { MouseEventHandler } from "react";
import Icon, { IIcon } from "./icon";
import { Button, SxProps, Tooltip, TooltipProps } from "@mui/material";

interface IProps {
	iconName: IIcon["name"];
	tip: TooltipProps["title"];
	onClick: MouseEventHandler<HTMLAnchorElement>;
	iconSx: SxProps;
	buttonSx: SxProps;
}
export default function IconButton({
	tip,
	iconName,
	onClick,
	iconSx,
	buttonSx,
}: IProps) {
	return (
		<Tooltip title={tip}>
			<Button className="editIcon" onClick={onClick} href="#outlined-buttons" sx={buttonSx}>
				<Icon name={iconName} sx={iconSx} />
			</Button>
		</Tooltip>
	);
}
