import React, { ReactElement, ReactNode } from "react";
import { useCurrentQuery } from "../api/userApi";
import { Box } from "@mui/material";
import { Routes } from "react-router-dom";

export default function ProtectedRoutes({
	children,
}: {
	children: ReactNode;
}) {
	const { isLoading } = useCurrentQuery();

	if (isLoading) {
		return (
			<>
				<Box height={20} width={20} bgcolor={"black"} />
			</>
		);
	}

	return <Routes>{children}</Routes>;
}
