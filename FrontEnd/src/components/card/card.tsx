import { ReactNode } from "react";
import IconButton, { IIconButton } from "../icon-button";

interface IProps {
	src: string;
	children: ReactNode;
	height: number | string;
	actions: IIconButton[];
}
export default function Card({ children, src, height, actions }: IProps) {
	return (
		<div
			style={{
				height: height,
				width: 250,
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					width: 250,
					height: 250,
					borderRadius: 20,
					overflow: "hidden",
					boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
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
				<div
					style={{
						position: "absolute",
						display: "flex",
						top: 6,
						right: 6,
					}}
				>
					{actions.map((action, index) => (
						<IconButton key={index} {...action} fontSize={22} />
					))}
				</div>
			</div>
			<div style={{ padding: "0px 12px 12px 12px" }}>{children}</div>
		</div>
	);
}
