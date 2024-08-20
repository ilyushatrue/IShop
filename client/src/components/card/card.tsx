import { MouseEvent, ReactNode } from "react";
import IconButton, { IIconButton } from "../buttons/icon-button";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

interface IProps {
	src: string;
	children: ReactNode;
	actions: IIconButton[];
	width: string | number;
	height: string | number;
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
}
export default function Card({
	children,
	src,
	actions,
	onClick,
	width,
	height,
}: IProps) {
	const { xs } = useMediaQueryContext();
	return (
		<div
			style={{
				height: height,
				width: width,
			}}
		>
			<div
				onClick={onClick}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					width: width,
					height: "200px",
					borderRadius: 20,
					overflow: "hidden",
					cursor: "pointer",
				}}
			>
				<img
					src={src}
					alt="logo"
					style={{
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
						<IconButton
							key={index}
							{...action}
							fontSize={xs ? 30 : 24}
						/>
					))}
				</div>
			</div>
			<div
				style={{
					height: "70px",
					textOverflow: "ellipsis",
					overflow: "clip",
					padding: "0px 12px 12px 12px",
				}}
			>
				{children}
			</div>
		</div>
	);
}
