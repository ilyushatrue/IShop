import { ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { getCurrent } from "../store/userSlice";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		dispatch(getCurrent())
			.then((result) => {
				console.log(result);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (!isLoading) {
		return <Box height={20} width={20} bgcolor={"black"} />;
	}

	return <Routes>{children}</Routes>;
}
