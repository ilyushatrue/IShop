import React from "react";
import { useNavigate } from "react-router-dom";

interface IPage {
	isLoading: boolean;
}
export default function Page({ isLoading }: IPage) {
	const navigate = useNavigate();

	return <div>Page</div>;
}
