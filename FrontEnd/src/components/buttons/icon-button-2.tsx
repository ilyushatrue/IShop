import { Button, ButtonProps, Icon } from "@mui/material";

export default function IconButton2({
	children,
	sx,
	size = "medium",
	fullWidth,
	...props
}: ButtonProps) {
	const sizePx = size === "small" ? 28 : size === "medium" ? 38 : 48
	return (
		<Button
			{...props}
			sx={{
				...sx,
				display:"flex",
				alignItems:"center",
				justifyContent:"center",
				borderRadius: "50%",
				minWidth: 0,
				padding: 0,
				height: sizePx,
				width: sizePx,
			}}
		>
			<Icon fontSize={size} sx={{margin:"auto"}}>{children}</Icon>
		</Button>
	);
}
