import { Typography } from "@mui/material";
import Card from "../../../components/card/card";
import getConstant from "../../../app/infrastructure/constant-provider";
import { useState } from "react";

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
	const imagesPath = getConstant("API_URL");
	const [isDisabled, setIsDisabled] = useState(false);
	const [isFavorite, setIsFavorite] = useState(favorite);

	return (
		<Card
			onClick={() => onClick(id)}
			src={imagesPath + "/media/image/" + imageId}
			width={"100%"}
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
			height={"400px"}
		>
			<Typography
				variant="body2"
				sx={{ fontWeight: "bold", fontSize: 20, mt: 1 }}
			>{`${price} ₽`}</Typography>
			<Typography variant="body2" sx={{ fontWeight: "bold" }}>
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
