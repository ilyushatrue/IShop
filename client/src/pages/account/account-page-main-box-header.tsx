import { Box, BoxProps, Button, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";
import { useCallback, useEffect } from "react";

export default function AccountPageMainBoxHeader({
	backUrl,
	backText,
	children,
	...props
}: BoxProps & { backUrl?: string; backText?: string }) {
	const navigate = useNavigate();
	const navigateBack = useCallback(
		() => (backUrl ? navigate(backUrl) : undefined),
		[backUrl, navigate]
	);
	const { xs } = useMediaQueryContext();

	useEffect(() => {
		if (!backUrl) return;
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				navigateBack();
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [backUrl, navigateBack]);

	return (
		<Box
			{...props}
			position={"relative"}
			height={50}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			margin={0}
			padding={0}
			color={"white"}
			bgcolor={"primary.700"}
		>
			{backUrl && (
				<Button
					onClick={navigateBack}
					sx={{
						position: "absolute",
						left: 0,
						color: "primary.200",
						marginLeft: 1,
						"&:hover": {
							color: "primary.100",
						},
						textTransform: "none",
					}}
					startIcon={<Icon>arrow_back</Icon>}
				>
					{xs ? "" : backText}
				</Button>
			)}
			{children}
		</Box>
	);
}
