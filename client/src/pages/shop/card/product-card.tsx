import { Typography } from "@mui/material";
import Card from "../../../components/card/card";
import getConstant from "../../../app/infrastructure/constant-provider";
import { useState } from "react";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";

export interface ICardAction {
	onClick: (id: string, favorite: boolean) => void;
	iconName: string;
	color: string;
}

export default function ProductCard({
	id,
	imageId,
	name,
	price,
	favorite,
	description,
	onFavoriteClick,
	onClick,
}: {
	id: string;
	onFavoriteClick: (id: string, favorite: boolean) => Promise<void>;
	onClick: (id: string) => void;
	favorite: boolean;
	price: number;
	imageId: string;
	name: string;
	description: string;
}) {
	const { xs } = useMediaQueryContext();
	const imagesPath = getConstant("API_URL");
	const [isDisabled, setIsDisabled] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorite);

	return (
		<Card
			onClick={() => onClick(id)}
			src={`${imagesPath}/media/image/${imageId}`}
			width={xs ? "100%" : "250px"}
			actions={[
				{
					iconName: isFavorite ? "favorite" : "favorite_outline",
					color: isFavorite ? "red" : "black",
					disabled: isDisabled,
					onClick: (e) => {
						e.stopPropagation();
						setIsDisabled(true);
						onFavoriteClick(id, !favorite).then(() => {
							setIsFavorite((prev) => !prev);
							setIsDisabled(false);
						});
					},
					variant: "circled",
					centered: true,
					fontSize: 28,
				},
			]}
			height={xs ? "300px" : 300}
		>
			<Typography
				variant="body2"
				sx={{ fontWeight: 600, fontSize: 20, mt: 1 }}
			>{`${price
				.toLocaleString("ru-RU")
				.replace(/,/g, " ")} ₽`}</Typography>
			<Typography variant="body2" sx={{ fontWeight: 500 }}>
				{name}
			</Typography>
			<Typography
				variant="caption"
				sx={{
					lineHeight: 0.1,
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					overflow: "hidden",
				}}
			>
				{description}
			</Typography>
		</Card>
	);
}
