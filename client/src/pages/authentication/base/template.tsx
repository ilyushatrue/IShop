import { Avatar, Box } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";

const containerStyle: CSSProperties = {
	padding: 36,
	width: "90vw",
	maxWidth: "380px",
	margin: "24px auto",
	backgroundColor: "white",
	borderRadius: 50,
	boxShadow: "0px 0px 24px rgba(0,0,0,0.05)",
};

const avatarStyle: CSSProperties = {
	height: 48,
	width: 48,
};

interface IProps {
	sm?: boolean;
	children?: ReactNode;
	title: string;
	avatar: ReactNode;
}

export default function Template({
	sm = false,
	avatar: avatarChildren,
	title,
	children,
}: IProps) {
	return (
		<Box
			style={containerStyle}
			sx={{
				display: "flex",
				justifyContent: "start",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Box
				display={"flex"}
				flexDirection={sm ? "column" : "row"}
				alignItems={"center"}
				gap={sm ? 0 : 2}
			>
				<Avatar style={avatarStyle} sx={{ bgcolor: "secondary.light" }}>
					{avatarChildren}
				</Avatar>
				<h2>{title}</h2>
			</Box>
			<Box width={"100%"}>{children}</Box>
		</Box>
	);
}
