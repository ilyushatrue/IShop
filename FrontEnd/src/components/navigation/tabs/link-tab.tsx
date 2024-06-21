import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export interface ILinkTab {
	index: number;
	isActive?: boolean;
	label?: string;
	href: string;
	onClick?: (activeIndex: number) => void;
}
export default function LinkTab({
	index,
	label,
	href,
	onClick,
	isActive = false,
}: ILinkTab) {
	return (
		<Link to={href}>
			<Button
				sx={{
					padding: 2,
					justifyContent: "start",
				}}
				onClick={() => onClick?.(index)}
			>
				<Typography
					variant="body2"
					sx={{
						textTransform: "none",
						fontWeight: "500", // Делает первую букву каждого слова заглавной
						color:"black"
					}}
				>
					{label}
				</Typography>
			</Button>
		</Link>
	);
}
