import { Button, ButtonProps, Icon } from "@mui/material";

export default function IconButton2({
	children,
	sx,
	size = "medium",
	...props
}: ButtonProps) {
	return (
		<Button
			{...props}
			sx={{
				...sx,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "50%",
				minWidth: 0,
				padding: 1,
			}}
		>
			<Icon fontSize={size}>{children}</Icon>
		</Button>
	);
}
