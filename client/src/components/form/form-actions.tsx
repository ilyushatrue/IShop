import { Box, BoxProps } from "@mui/material";

export default function FormActions({ sx, ...props }: BoxProps) {
	return (
		<Box
			{...props}
			sx={{
				display: "flex",
				gap: 1,
				justifyContent: "space-between",
				marginTop: "16px",
				...sx,
			}}
		/>
	);
}
