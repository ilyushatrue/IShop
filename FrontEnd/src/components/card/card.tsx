import { ReactNode } from "react";

interface IProps {
	src: string;
	children: ReactNode;
}
export default function Card({ children, src }: IProps) {
	return (
		<div
			style={{
				height: "220px",
				backgroundColor: "white",
				borderRadius: 20,
				overflow: "hidden",
				boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					minWidth: "180px",
					height: "180px",
					backgroundColor: "white",
					overflow: "hidden",
				}}
			>
				<img
					src={src}
					alt="logo"
					style={{
						margin: "auto",
						objectFit: "contain",
						maxHeight: "100%",
						maxWidth: "100%",
					}}
				/>
			</div>
			<div style={{ padding: "0px 12px 12px 12px" }}>{children}</div>
		</div>
	);
}
