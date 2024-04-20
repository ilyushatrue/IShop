import React, { MouseEventHandler } from "react";
import Icon, { IIcon } from "./icon";
import { Button, Tooltip, TooltipProps } from "@mui/material";

interface IProps {
	iconName: IIcon["name"];
	tip: TooltipProps["title"];
	onClick: MouseEventHandler<HTMLAnchorElement>;
}
export default function IconButton({ tip, iconName, onClick }: IProps) {
	return (
		<Tooltip title={tip}>
			<Button onClick={onClick} href="#outlined-buttons">
				<Icon name={iconName} />;
			</Button>
		</Tooltip>
	);
}
