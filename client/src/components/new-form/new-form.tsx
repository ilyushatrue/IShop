import { useEffect, useRef } from "react";
import { Box, BoxProps } from "@mui/material";

export interface FormProps extends BoxProps {
	onEnterKeyDown?: () => void;
}
export default function NewForm({
	onEnterKeyDown,
	children,
	...props
}: FormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	
	useEffect(() => {
		const ref = formRef.current;
		if (!onEnterKeyDown || !ref) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter" && ref.contains(event.target as Node)) {
				event.stopPropagation();
				onEnterKeyDown();
			}
		};

		ref.addEventListener("keydown", handleEnterKeyDown);
		return () => {
			ref.removeEventListener("keydown", handleEnterKeyDown);
		};
	}, [onEnterKeyDown]);

	return (
		<Box component={"form"} ref={formRef} {...props}>
			{children}
		</Box>
	);
}
