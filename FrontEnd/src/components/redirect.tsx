import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RedirectComponent({
	redirectPath,
}: {
	redirectPath: string;
}) {
	const { category } = useParams<{ category: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		if (category) {
			navigate(redirectPath, { replace: true });
		}
	}, [category, navigate, redirectPath]);

	return null;
}
