import { Avatar, Box, Typography } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";
import Page from "../../components/page";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

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
	children?: ReactNode;
	title: string;
	avatarChildren: ReactNode;
}

export default function Template({ avatarChildren, title, children }: IProps) {
	const { height } = useAppSelector((state) => state.page.navbar);
	const { xs, screenSize } = useMediaQueryContext();
	return (
		<Page height={`calc(100vh - ${height[screenSize]}px)`}>
			{xs ? (
				<Box sx={{ bgcolor: "white", height: "100%", padding: 2 }}>
					<Box
						position={"relative"}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						paddingY={2}
					>
						<Avatar
							sx={{
								position: "absolute",
								left: 0,
								bgcolor: "rgb(220, 220, 220)",
								height: 35,
								width: 35,
							}}
						>
							{avatarChildren}
						</Avatar>
						<Typography variant="h5">{title}</Typography>
					</Box>
					{children}
				</Box>
			) : (
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
						flexDirection={xs ? "column" : "row"}
						alignItems={"center"}
						gap={xs ? 0 : 2}
					>
						<Avatar
							style={avatarStyle}
							sx={{ bgcolor: "secondary.light" }}
						>
							{avatarChildren}
						</Avatar>
						<h2>{title}</h2>
					</Box>
					<Box width={"100%"}>{children}</Box>
				</Box>
			)}
		</Page>
	);
}
