import { SxProps, Icon as MuiIcon } from "@mui/material";

export interface IIcon {
	name: string;
	sx?: SxProps;
	fontSize?: "inherit" | "large" | "medium" | "small" | string;
}
export default function Icon({ name, sx, fontSize }: IIcon) {
	return <MuiIcon sx={{ ...sx, fontSize: fontSize }}>{name}</MuiIcon>;
}
