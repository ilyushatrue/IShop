import { SxProps, Icon as MuiIcon } from "@mui/material";

export interface IIcon {
	name: string;
	fontSize?: string;
	sx?: SxProps;
}
export default function Icon2({ name, sx, fontSize }: IIcon) {
	return <MuiIcon sx={{ ...sx, fontSize: fontSize }}>{name}</MuiIcon>;
}
