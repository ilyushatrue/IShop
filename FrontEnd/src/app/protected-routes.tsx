import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Routes, RoutesProps } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { getCurrent } from "../store/userSlice";

export default function ProtectedRoutes({ children }: RoutesProps) {
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
		console.log("protected-routes", "isLoading: ", isLoading)
		return <Box display={"inline"} height={20} bgcolor={"black"} color={"white"}>loaded</Box>;
	}

	return <Routes>{children}</Routes>;
}
