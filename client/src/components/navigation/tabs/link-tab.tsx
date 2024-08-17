import { Button, Icon, Typography } from "@mui/material";

export interface ILinkTab {
	index: number;
	isActive?: boolean;
	label?: string;
	href: string;
	onClick?: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		activeIndex: number,
		href: string
	) => void;
	iconName: string;
}
export default function LinkTab({
	index,
	label,
	href,
	iconName,
	onClick,
	isActive = false,
}: ILinkTab) {
	return (
		<Button
			sx={{
				padding: 2,
				justifyContent: "start",
				bgcolor: isActive ? "whitesmoke" : "white",
			}}
			onClick={(e) => onClick?.(e, index, href)}
			startIcon={<Icon sx={{ color: "black" }}>{iconName}</Icon>}
		>
			<Typography
				variant="body2"
				sx={{
					textTransform: "none",
					fontWeight: "500",
					color: "black",
				}}
			>
				{label}
			</Typography>
		</Button>
	);
}
