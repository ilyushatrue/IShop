import { IconOwnProps, SxProps } from "@mui/material";
import Icon from "@mui/material/Icon";

export type IconType = "edit" | "menu" | "subject" | "logout" | "login" | "visibility" | "visibility_off";

export interface IIcon {
	name: IconType;
	fontSize?: IconOwnProps["fontSize"];
	sx?: SxProps;
}
export default function Icon2({ name, fontSize, sx }: IIcon) {
	return (
		<Icon sx={sx} fontSize={fontSize}>
			{name}
		</Icon>
	);
}
