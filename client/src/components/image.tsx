import { Box } from "@mui/material";
import getConstant from "../app/infrastructure/constant-provider";

export default function Image({
	imageId,
	size = 32,
	noImage = "placeholder",
}: {
	imageId?: string | null;
	size?: number | string;
	noImage?: "placeholder" | "emptySpace";
}) {
	function getImageSrc() {
		if (imageId) {
			return getConstant("API_URL") + "/media/image/" + imageId;
		} else {
			if (noImage === "placeholder") {
				return getConstant("IMAGES_PATH") + "/no-avatar.jpg";
			} else {
				return ""; // Пустая строка, если noImage === "emptySpace"
			}
		}
	}

	if (!imageId && (!noImage || noImage === "emptySpace")) return (
		<Box height={size} width={size}>

		</Box>
	);

	return <img src={getImageSrc()} alt={""} style={{maxWidth: size, maxHeight:size }}/>;
}
