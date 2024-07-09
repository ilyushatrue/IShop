import { Typography } from "@mui/material";
import Card from "../../../components/card/card";
import getConstant from "../../../app/infrastructure/constant-provider";

export interface ICardAction {
	onClick: (id: string) => void;
	iconName: string;
}

export default function ProductCard({
	id,
	imageId,
	actions,
	name,
	description,
}: {
	id: string;
	imageId: string;
	name: string;
	description: string;
	actions: ICardAction[];
}) {
	const imagesPath = getConstant("API_URL");

console.log(id)
	return (
		<Card
			src={imagesPath + "/media/image/" + imageId}
			actions={actions.map((x) => ({
				iconName: x.iconName,
				onClick: () => x.onClick(id),
				variant: "circled",
				centered: true,
				fontSize: 28,
			}))}
			height={300}
		>
			<Typography variant="body2">{name}</Typography>
			<Typography variant="caption">{description}</Typography>
		</Card>
	);
}
